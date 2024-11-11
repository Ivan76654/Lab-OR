import { useEffect, useState } from 'react';
import FilterForm from './FilterForm';
import DataTable from './DataTable';
import '../App.css';

function DataTablePage() {
  const host = import.meta.env.VITE_SERVER_HOST;

  const [data, setData] = useState([]);
  const [filterField, setFilterField] = useState('*');
  const [filterValue, setFilterValue] = useState('');

  function onFilterSearchSubmit(elements) {
    const filterFieldFormValue = elements.filterField.value;
    const filterValueFormValue = elements.filterValue.value;

    const requestBody = {
      filterField: filterFieldFormValue,
      filterValue: filterValueFormValue
    };

    const filterData = async () => {
      const response = await fetch(`${host}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const body = await response.json();

        setData(body.data);
        setFilterField(filterFieldFormValue);
        setFilterValue(filterValueFormValue);
      }
    };

    filterData();
  }

  useEffect(() => {
    (async () => {
      const requestBody = {
        filterField: '*',
        filterValue: ''
      };

      const response = await fetch(`${host}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const body = await response.json();

        setData(body.data);
      }
    })();
  }, []);

  return (
    <>
      <FilterForm
        filterField={filterField}
        filterValue={filterValue}
        onFilterSearchSubmit={onFilterSearchSubmit}
      />
      <DataTable data={data} />
    </>
  );
}

export default DataTablePage;
