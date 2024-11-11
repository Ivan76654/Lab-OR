COPY (
    SELECT city.*,
           m.measurementId, 
           m.timestamp, 
           m.temperature,
           m.humidity,
           m.pressure
    FROM city NATURAL JOIN measurement as m
) TO STDOUT DELIMITER ',' CSV HEADER;
