/* eslint-disable camelcase */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setCars, selectCars } from '../reducers/carSlice';
import { getCars } from '../services/request';

const Measurements = () => {
  const cars = useSelector(selectCars);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const cars = await getCars();
      dispatch(setCars(cars));
    };
    fetchUser();
  }, []);

  return (
    <div className="measurements">
      {cars?.map(({
        img_url, model, make, year, id,
      }) => (
        <Link key={`${make} ${model}`} to={`/cars/${id}`} className="carLinks">
          <div className="card bg-dark text-white">
            <img src={img_url} className="card-img" alt={`${make} ${model}`} />
            <div className="card-img-overlay">
              <h5 className="card-title">{`${make} ${model}`}</h5>
              <p className="card-text">{year?.toUpperCase()}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Measurements;
