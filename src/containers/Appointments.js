import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAppointments } from '../reducers/appointmentSlice';
import { fetchAppointments } from '../services/request';

const Measurements = () => {
  // const readings = useSelector(selectReadings);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAppointments = async () => {
      const appointments = await fetchAppointments();

      dispatch(setAppointments(appointments));
    };
    getAppointments();
  }, []);

  return (
    <div className="measurements">
      Appointments
    </div>
  );
};

export default Measurements;
