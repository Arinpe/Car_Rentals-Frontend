import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setAppointments, selectAppointments } from '../reducers/appointmentSlice';
import { fetchAppointments } from '../services/request';
import Card from '../components/Card';

const Measurements = () => {
  const appointments = useSelector(selectAppointments);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAppointments = async () => {
      const appointments = await fetchAppointments();
      dispatch(setAppointments(appointments));
    };
    getAppointments();
  }, []);

  return (
    <div className="measurements p-4">
      {appointments?.map(({ car, date, city }) => (
        <Card
          key={date}
          imgSrc={car.img_url}
          date={date}
          city={city}
        />
      ))}
    </div>
  );
};

export default Measurements;
