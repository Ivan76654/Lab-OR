const express = require('express');
const { format } = require('date-fns');
const { query } = require('../db');
const {
  allColumns,
  csvColumnHeaders,
  formatTimestampsInResultSet,
  timestampFormat,
  sqlFilterHelper,
  toCSVString
} = require('../utility');

const downloadRouter = express.Router();

downloadRouter.post('/csv', (req, res) => {
  (async () => {
    const filterField = req.body.filterField;
    const filterValue = req.body.filterValue;

    let sqlQuery =
      'SELECT city.*, measurement.* FROM city NATURAL JOIN measurement';
    let params = [];

    sqlQuery = sqlFilterHelper(
      sqlQuery,
      params,
      filterField,
      filterValue,
      allColumns
    );

    const result = await query(sqlQuery, params);

    const formattedResult = formatTimestampsInResultSet(
      result.rows,
      timestampFormat
    );

    const csvString = toCSVString(
      csvColumnHeaders,
      formattedResult,
      csvColumnHeaders.length
    );

    const buffer = Buffer.from(csvString, 'utf-8');

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream'
    });

    res.write(buffer);
    res.end();
  })();
});

downloadRouter.post('/json', (req, res) => {
  (async () => {
    const filterField = req.body.filterField;
    const filterValue = req.body.filterValue;

    let citySql = 'SELECT DISTINCT city.* FROM city NATURAL JOIN measurement';
    let measurementSql =
      'SELECT DISTINCT measurement.* FROM city NATURAL JOIN measurement';

    let cityParams = [];
    let measurementParams = [];

    citySql = `${sqlFilterHelper(
      citySql,
      cityParams,
      filterField,
      filterValue,
      allColumns
    )} ORDER BY city.cityId;`;
    measurementSql = `${sqlFilterHelper(
      measurementSql,
      measurementParams,
      filterField,
      filterValue,
      allColumns
    )} ORDER BY measurement.measurementId;`;

    const [cityResult, measurementResult] = await Promise.all([
      query(citySql, cityParams),
      query(measurementSql, measurementParams)
    ]);

    const formattedCityResult = cityResult.rows;

    const formattedMeasurementResult = measurementResult.rows.map((row) => {
      return {
        ...row,
        timestamp: format(row.timestamp, timestampFormat)
      };
    });

    for (let i = 0; i < cityResult.rows.length; i++) {
      const currentCity = formattedCityResult[i];
      const cityMeasurements = formattedMeasurementResult
        .filter((measurement) => currentCity.cityid === measurement.cityid)
        .map((measurement) => {
          delete measurement.cityid;
          return measurement;
        });
      currentCity.measurements = cityMeasurements;
    }

    res.json({
      cities: formattedCityResult
    });
  })();
});

module.exports = downloadRouter;
