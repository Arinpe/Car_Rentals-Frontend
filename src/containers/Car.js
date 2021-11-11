import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { setCar, selectCar } from '../reducers/carSlice';
import { fetchCar } from '../services/request';
import loading from '../assets/loading.gif';

const Measurement = () => {
  const car = useSelector(selectCar);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchMeasurements = async () => {
      const res = await fetchCar(id);
      dispatch(setCar(res));
    };
    fetchMeasurements();
  }, []);

  return (
    <div className="p-3 car">
      <div>
        <div className="car_banner">
          <img src={car.img_url ? car.img_url : loading} alt="Car" />
        </div>
        <h5 className="mt-2 text-center">
          <span className="car_make">{car.make}</span>
          <span className="car_model">{car.model}</span>
          <span className="car_year">{car.year}</span>
        </h5>
        <h4 className="p-4 car_description">{car.description}</h4>
      </div>
      <Link className="btn btn-lg btn-primary text-secondary" to={`/cars/${car.id}/appointment`}>Create Appointment</Link>
    </div>
  );
};

export default Measurement;
