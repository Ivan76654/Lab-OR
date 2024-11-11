import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DataTablePage from './components/DataTablePage';
import './App.css';
import RootLayout from './components/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/datatable', element: <DataTablePage /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
