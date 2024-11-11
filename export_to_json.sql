COPY (
	WITH
		SQ AS (
			SELECT
				city.*,
				ARRAY_AGG(
					JSONB_BUILD_OBJECT(
						'measurementId',
						measurement.measurementId,
						'timestamp',
						measurement.timestamp,
						'temperature',
						measurement.temperature,
						'humidity',
						measurement.humidity,
						'pressure',
						measurement.pressure
					)
				) AS measurements
			FROM
				city
				NATURAL JOIN measurement
			GROUP BY
				city.cityId
			ORDER BY
				city.cityId
		)
	SELECT
        TO_JSONB(ARRAY_AGG(SQ))
	FROM
		SQ
) TO STDOUT;
