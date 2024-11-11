const express = require('express');
const { query } = require('../db');
const { allColumns, formatTimestampsInResultSet, timestampFormat, sqlFilterHelper } = require('../utility');

const homeRouter = express.Router();

homeRouter.post('/data', (req, res) => {
	(async () => {
		try {
			const filterField = req.body.filterField;
			const filterValue = req.body.filterValue;

			let sqlQuery = 'SELECT city.*, measurement.* FROM city NATURAL JOIN measurement';
			let params = [];

			sqlQuery = `${sqlFilterHelper(sqlQuery, params, filterField, filterValue, allColumns)} ORDER BY city.cityId, measurement.measurementId;`;

			const result = await query(sqlQuery, params);

			const formattedResult = formatTimestampsInResultSet(result.rows, timestampFormat);

			res.json({
				rowCount: result.rowCount,
				data: formattedResult,
			});
			
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	})();
});

module.exports = homeRouter;