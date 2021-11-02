import { useSelector, useDispatch } from 'react-redux';
import { isThisWeek, getISOWeek } from 'date-fns';
import { useEffect } from 'react';
import Tab from '../components/Tab';
import Header from '../components/Header';
import { selectReadings, setReadings } from '../reducers/readingSlice';
import { getUser } from '../services/request';
import Footer from '../components/Footer';
import { isToday, isYesterday } from '../services/common';

const Measurements = () => {
  const readings = useSelector(selectReadings);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const { measures } = await getUser();
      dispatch(setReadings(measures));
    };
    fetchUser();
  }, []);
  const todayItems = [];
  const yesterdayItems = [];
  const thisWeekItems = [];
  const lastWeekItems = [];
  const previousItems = [];

  if (readings?.length) {
    readings.forEach((reading) => {
      const {
        measurements, title, unit, goal, id,
      } = reading;
      let relativeDate = reading.date_created;
      const measurementsLength = measurements.length;
      if (measurementsLength) {
        relativeDate = measurements[measurementsLength - 1].date;
      }

      let percentage = 0;
      if (measurements[measurementsLength - 1]) {
        percentage = (measurements[measurementsLength - 1].value / goal);
      }
      const res = {
        date: relativeDate,
        title,
        percentage,
        unit,
        id: id.toString(),
      };
      const today = new Date();
      if (isToday(new Date(relativeDate), today)) {
        todayItems.push(res);
      } else if (isYesterday(relativeDate)) {
        yesterdayItems.push(res);
      } else if (isThisWeek(new Date(relativeDate))) {
        thisWeekItems.push(res);
      } else if ((getISOWeek(today) - getISOWeek(relativeDate)) === 1) {
        lastWeekItems.push(res);
      } else {
        previousItems.push(res);
      }
      return [];
    });
  }

  return (
    <div className="measurements">
      <Header />
      <div className="tabs">
        <Tab title="Today" res={todayItems} />
        <Tab title="Yesterday" res={yesterdayItems} />
        <Tab title="This week" res={thisWeekItems} />
        <Tab title="Last Week" res={lastWeekItems} />
        <Tab title="Previous" res={previousItems} />
      </div>
      <Footer url="/measurements/categories/new" />
    </div>
  );
};

export default Measurements;
