COPY (SELECT city.*, measurement.* FROM city NATURAL JOIN measurement) TO STDOUT DELIMITER ',' CSV HEADER;
