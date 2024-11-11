import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/Header';
import HomePage from './components/HomePage';
import DataTablePage from './components/DataTablePage';
import './App.css';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/datatable', element: <DataTablePage />}
]);

function App() {
  return (
    <>
      <Header />
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;