import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { setCar } from '../reducers/carSlice';
import { fetchCar } from '../services/request';
import AppointmentForm from './AppointmentForm';

const Measurement = () => {
  // const reading = useSelector(selectReading);
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
    <div className="measurements">
      Car
      <AppointmentForm />
    </div>
  );
};

export default Measurement;
