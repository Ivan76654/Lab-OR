const express = require('express');
const openapi = require('../docs/openapi.json');
const { query } = require('../db');
const { timestampFormat, formatTimestampsInResultSet } = require('../utility');

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

apiRouter.get('/data', (req, res, next) => {
  (async () => {
    try {
      const citySql =
        'SELECT cityid, cityname, country, latitude, longitude, area, elevation, population, timezone, region FROM city ORDER BY cityid;';
      const measurementSql =
        'SELECT measurementid, cityid, timestamp, temperature, humidity, pressure FROM measurement ORDER BY measurementid;';
      const cityParams = [];
      const measurementParams = [];

      const [cityResult, measurementResult] = await Promise.all([
        query(citySql, cityParams),
        query(measurementSql, measurementParams)
      ]);

      const formattedCityResult = cityResult.rows;

      const formattedMeasurementResult = formatTimestampsInResultSet(
        measurementResult.rows,
        timestampFormat
      );

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

      res.status(200);
      res.json({
        status: 200,
        errorMessage: null,
        response: formattedCityResult
      });
    } catch (err) {
      next({
        status: 500,
        errorMessage: err.message
      });
    }
  })();
});

apiRouter.get('/cities', (req, res, next) => {
  (async () => {
    try {
      const citySql =
        'SELECT cityid, cityname, country, latitude, longitude, area, elevation, population, timezone, region FROM city ORDER BY cityid;';
      const cityParams = [];

      const cityResult = await query(citySql, cityParams);

      res.status(200);
      res.json({
        status: 200,
        errorMessage: null,
        response: cityResult.rows
      });
    } catch (err) {
      next({
        status: 500,
        errorMessage: err.message
      });
    }
  })();
});

apiRouter.get('/cities/:cityId', (req, res, next) => {
  (async () => {
    try {
      const cityId = req.params.cityId;
      const citySql =
        'SELECT cityid, cityname, country, latitude, longitude, area, elevation, population, timezone, region FROM city WHERE cityid = $1;';
      const cityParams = [cityId];

      const cityResult = await query(citySql, cityParams);

      if (cityResult.rowCount === 0) {
        next({
          status: 404,
          errorMessage: 'Not found'
        });
      } else {
        res.status(200);
        res.json({
          status: 200,
          errorMessage: null,
          response: cityResult.rows[0]
        });
      }
    } catch (err) {
      next({
        status: 500,
        errorMessage: err.message
      });
    }
  })();
});

apiRouter.get('/measurements', (req, res, next) => {
  (async () => {
    try {
      const measurementSql =
        'SELECT measurementid, cityid, timestamp, temperature, humidity, pressure FROM measurement ORDER BY measurementid;';
      const measurementParams = [];

      const measurementResult = await query(measurementSql, measurementParams);

      const formattedMeasurementResult = formatTimestampsInResultSet(
        measurementResult.rows,
        timestampFormat
      );

      res.status(200);
      res.json({
        status: 200,
        errorMessage: null,
        response: formattedMeasurementResult
      });
    } catch (err) {
      next({
        status: 500,
        errorMessage: err.message
      });
    }
  })();
});

apiRouter.get('/measurements/:measurementId', (req, res, next) => {
  (async () => {
    try {
      const measurementId = req.params.measurementId;
      const measurementSql =
        'SELECT measurementid, cityid, timestamp, temperature, humidity, pressure FROM measurement WHERE measurementid = $1;';
      const cityParams = [measurementId];

      const measurementResult = await query(measurementSql, cityParams);

      if (measurementResult.rowCount === 0) {
        next({
          status: 404,
          errorMessage: 'Not found'
        });
      } else {
        res.status(200);
        res.json({
          status: 200,
          errorMessage: null,
          response: measurementResult.rows[0]
        });
      }
    } catch (err) {
      next({
        status: 500,
        errorMessage: err.message
      });
    }
  })();
});

apiRouter.get('/openapi', (req, res, next) => {
  (async () => {
    try {
      res.status(200);
      res.json({
        status: 200,
        errorMessage: null,
        response: openapi
      });
    } catch (err) {
      next({
        status: 500,
        errorMessage: err.message
      });
    }
  })();
});

apiRouter.post('/cities', (req, res, next) => {
  (async () => {
    try {
      const city = req.body;

      if (
        !city ||
        !city.cityname ||
        !city.country ||
        !city.latitude ||
        !city.longitude ||
        !city.timezone ||
        !city.region
      ) {
        next({
          status: 400,
          errorMessage: 'Bad request'
        });
      }

      const insertQuery =
        'INSERT INTO city (cityname, country, latitude, longitude, area, elevation, population, timezone, region) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;';

      const queryParams = [
        city.cityname,
        city.country,
        city.latitude,
        city.longitude,
        city.area,
        city.elevation,
        city.population,
        city.timezone,
        city.region
      ];

      const newCity = (await query(insertQuery, queryParams)).rows[0];

      res.status(201);
      res.json({
        status: 201,
        errorMessage: null,
        response: newCity
      });
    } catch (err) {
      next({
        status: 500,
        errorMessage: err.message
      });
    }
  })();
});

apiRouter.put('/cities/:cityId', (req, res, next) => {
  (async () => {
    try {
      const cityId = req.params.cityId;
      const city = req.body;

      if (
        !city ||
        !city.cityname ||
        !city.country ||
        !city.latitude ||
        !city.longitude ||
        !city.timezone ||
        !city.region
      ) {
        next({
          status: 400,
          errorMessage: 'Bad request'
        });
      }

      const citySql = 'SELECT cityid FROM city WHERE cityid = $1;';
      const cityParams = [cityId];

      const cityResult = await query(citySql, cityParams);

      const queryParams = [
        city.cityname,
        city.country,
        city.latitude,
        city.longitude,
        city.area,
        city.elevation,
        city.population,
        city.timezone,
        city.region
      ];

      if (cityResult.rowCount === 0) {
        const insertQuery =
          'INSERT INTO city (cityname, country, latitude, longitude, area, elevation, population, timezone, region) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;';

        const newCity = (await query(insertQuery, queryParams)).rows[0];

        res.status(201);
        res.json({
          status: 201,
          errorMessage: null,
          response: newCity
        });
      } else {
        const updateQuery =
          'UPDATE city SET cityname = $1, country = $2, latitude = $3, longitude = $4, area = $5, elevation = $6, population = $7, timezone = $8, region = $9 WHERE cityid = $10;';
        queryParams.push(cityId);

        await query(updateQuery, queryParams);

        res.status(200);
        res.json({
          status: 200,
          errorMessage: null,
          response: null
        });
      }
    } catch (err) {
      next({
        status: 500,
        errorMessage: err.message
      });
    }
  })();
});

apiRouter.delete('/cities/:cityId', (req, res, next) => {
  (async () => {
    try {
      const cityId = req.params.cityId;
      const citySql = 'SELECT cityid FROM city WHERE cityid = $1;';
      const cityParams = [cityId];

      const cityResult = await query(citySql, cityParams);

      if (cityResult.rowCount === 0) {
        next({
          status: 404,
          errorMessage: 'Not found'
        });
      }

      const deleteQuery = 'DELETE FROM city WHERE cityid = $1;';
      const queryParams = [cityId];

      await query(deleteQuery, queryParams);

      res.status(200);
      res.json({
        status: 200,
        errorMessage: null,
        response: null
      });
    } catch (err) {
      next({
        status: 500,
        errorMessage: err.message
      });
    }
  })();
});

// Error handling
apiRouter.use((err, req, res, next) => {
  res.status(err.status);
  res.json({
    status: err.status,
    errorMessage: err.errorMessage,
    response: null
  });
});

module.exports = apiRouter;
