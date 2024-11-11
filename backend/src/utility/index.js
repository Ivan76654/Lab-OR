const pgFormat = require('pg-format');
const { format } = require('date-fns');

const allColumns = [
  'cityid',
  'cityname',
  'country',
  'latitude',
  'longitude',
  'area',
  'elevation',
  'population',
  'timezone',
  'region',
  'measurementid',
  'timestamp',
  'temperature',
  'humidity',
  'pressure'
];

const csvColumnHeaders = [
  'cityid',
  'cityname',
  'country',
  'latitude',
  'longitude',
  'area',
  'elevation',
  'population',
  'timezone',
  'region',
  'measurementid',
  'timestamp',
  'temperature',
  'humidity',
  'pressure'
];

const timestampFormat = `yyyy-MM-dd'T'HH:mm:ss`;

function formatTimestampsInResultSet(rows, dateFormat) {
  return rows.map((row) => {
    return {
      ...row,
      timestamp: format(row.timestamp, dateFormat)
    };
  });
}

function sqlFilterHelper(sqlQuery, params, filterField, filterValue, columns) {
  if ((!columns.includes(filterField) && filterField !== '*') || !filterValue)
    return sqlQuery;

  filterValue = `%${filterValue}%`;

  switch (filterField) {
    case '*':
      let filterHelper = 'WHERE';

      for (let i = 0; i < columns.length; i++) {
        if (i === columns.length - 1) {
          filterHelper += ` LOWER(${columns[i]}::VARCHAR) LIKE LOWER($1)`;

          continue;
        }

        filterHelper += ` LOWER(${columns[i]}::VARCHAR) LIKE LOWER($1) OR`;
      }

      params.push(filterValue);
      sqlQuery = `${sqlQuery} ${filterHelper}`;
      break;

    default:
      sqlQuery = pgFormat(
        `${sqlQuery} WHERE LOWER(%I::VARCHAR) LIKE LOWER(%L)`,
        filterField,
        filterValue
      );
      break;
  }

  return sqlQuery;
}

function toCSVString(headerRow, rows, numOfColumns) {
  let csvString = '';

  for (let i = 0; i < numOfColumns; i++) {
    if (i === 0) {
      csvString += headerRow[i];

      continue;
    }

    csvString = `${csvString},${headerRow[i]}`;
  }

  csvString += '\n';

  if (!rows.length) return csvString;

  const keys = Object.keys(rows[0]);

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < numOfColumns; j++) {
      if (j === 0) {
        csvString += rows[i][keys[j]];

        continue;
      }

      csvString = `${csvString},${rows[i][keys[j]]}`;
    }

    csvString += '\n';
  }

  return csvString;
}

module.exports = {
  allColumns,
  csvColumnHeaders,
  timestampFormat,
  formatTimestampsInResultSet,
  sqlFilterHelper,
  toCSVString
};
