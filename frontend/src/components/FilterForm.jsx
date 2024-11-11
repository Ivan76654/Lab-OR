import FileSaver from 'file-saver';

function FilterForm({ filterField, filterValue, onFilterSearchSubmit }) {
  const host = import.meta.env.VITE_SERVER_HOST;

  async function downloadCSV(e) {
    e.preventDefault();

    const requestBody = {
      filterField,
      filterValue
    };

    const response = await fetch(`${host}/download/csv`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      const csvBlob = await response.blob();

      FileSaver.saveAs(csvBlob, `data.csv`);
    }
  }

  async function downloadJSON(e) {
    e.preventDefault();

    const requestBody = {
      filterField,
      filterValue
    };

    const response = await fetch(`${host}/download/json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      const result = await response.json();

      FileSaver.saveAs(
        new Blob([JSON.stringify(result, null, 2)]),
        'data.json'
      );
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    onFilterSearchSubmit(e.target.elements);
  }

  return (
    <section className="filter-form-section">
      <div className="filter-form-container">
        <form className="filter-form" onSubmit={handleSearchSubmit}>
          <select id="atribut" name="filterField">
            <option value="*">All Columns</option>
            <option value="cityid">City ID</option>
            <option value="cityname">City Name</option>
            <option value="country">Country</option>
            <option value="latitude">Latitude</option>
            <option value="longitude">Longitude</option>
            <option value="area">Area</option>
            <option value="elevation">Elevation</option>
            <option value="population">Population</option>
            <option value="timezone">Timezone</option>
            <option value="region">Region</option>
            <option value="measurementid">Measurement ID</option>
            <option value="timestamp">Timestamp</option>
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
            <option value="pressure">Pressure</option>
          </select>
          <input
            id="pretraga"
            name="filterValue"
            type="text"
            placeholder="Filter value"
          ></input>
          <button id="gumb" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="export-links-container">
        <ul className="export-links-list">
          <li>
            <a onClick={downloadCSV}>CSV</a>
          </li>
          <li>
            <a onClick={downloadJSON}>JSON</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default FilterForm;
