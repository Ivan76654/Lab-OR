import TableRow from './TableRow';

function DataTable({ data }) {
  return (
    <section>
      {data.length > 0 ? (
        <table id="tablica">
          <thead>
            <tr>
              <th>Measurement ID</th>
              <th>Timestamp</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Pressure</th>
              <th>City ID</th>
              <th>City Name</th>
              <th>Country</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Area</th>
              <th>Elevation</th>
              <th>Population</th>
              <th>Timezone</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <TableRow record={record} key={record.measurementid} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nothing to display</p>
      )}
    </section>
  );
}

export default DataTable;
