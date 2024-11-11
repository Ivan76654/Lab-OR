import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <div className="header">
        <h1>Sensor Measurements in European Cities</h1>
        <nav className="nav-container">
          <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/datatable">Dataset</Link>
            </li>
          </ul>
        </nav>
      </div>
      <hr />
    </header>
  );
}

export default Header;
