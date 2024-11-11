function TableRow({ record }) {
  return (
    <tr>
      <td>{record.measurementid}</td>
      <td>{record.timestamp}</td>
      <td>{record.temperature}</td>
      <td>{record.humidity}</td>
      <td>{record.pressure}</td>
      <td>{record.cityid}</td>
      <td>{record.cityname}</td>
      <td>{record.country}</td>
      <td>{record.latitude}</td>
      <td>{record.longitude}</td>
      <td>{record.area}</td>
      <td>{record.elevation}</td>
      <td>{record.population}</td>
      <td>{record.timezone}</td>
      <td>{record.region}</td>
    </tr>
  );
}

export default TableRow;
