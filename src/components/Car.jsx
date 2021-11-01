import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Car = ({ car }) => (
  <article className="car">
    <div className="img-container">
      <Link to={`/car/${car.id}`} className="banner-btn car-link">
        Features
      </Link>
    </div>
    <p className="car-info">{car.name}</p>
  </article>
);

Car.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Car;
