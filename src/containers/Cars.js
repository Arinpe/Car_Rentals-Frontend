import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCars } from '../reducers/carSlice';
import { getCars } from '../services/request';

const Measurements = () => {
  // const readings = useSelector(selectReadings);
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
      Measurements
    </div>
  );
};

export default Measurements;
