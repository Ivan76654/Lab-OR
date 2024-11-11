import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="home">
      <div>
        <h1 className="welcome">Welcome!</h1>
        <p>
          Explore open-access environmental data gathered from sensors across
          major cities in Europe. This website provides historical measurements
          of temperature, humidity, and air pressure and other general data
          about cities where the sensors are situated. You can also easily
          filter the data.
        </p>
        <p>
          The dataset is accessible <Link to="/datatable">here</Link>! It is
          also available for download in CSV and JSON format.
        </p>
      </div>
    </section>
  );
}

export default HomePage;
