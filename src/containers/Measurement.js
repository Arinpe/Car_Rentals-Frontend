import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { selectReading, setReading } from '../reducers/readingSlice';
import { formatDate } from '../services/common';
import { fetchMeasurement } from '../services/request';

const Measurement = () => {
  const reading = useSelector(selectReading);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchMeasurements = async () => {
      const res = await fetchMeasurement(id);
      dispatch(setReading(res));
    };
    fetchMeasurements();
  }, []);

  const {
    goal, title, unit, measurements,
  } = reading;
  const measurementsLength = measurements?.length || 0;
  let latestMeasurement = 0;
  if (measurementsLength) {
    latestMeasurement = measurements[measurementsLength - 1].value;
  }
  return (
    <div className="measurements">
      <Header />
      <div className="text-center measurement">
        <div className="pt-4 pb-3 measurement-heading">
          <h6>{reading.updated_at ? formatDate(new Date(reading.updated_at)) : ''}</h6>

          <div className="d-flex align-items-center justify-content-between px-4">
            <p className="measurement-title">{title?.toUpperCase()}</p>
            <div className="charts">
              <CircularProgressbar
                value={latestMeasurement}
                strokeWidth={5}
                text={`${latestMeasurement}(${unit})`}
                styles={buildStyles({
                  textColor: '#999999',
                  pathColor: '#97E493',
                  trailColor: '#999999',
                })}
              />
              <small className="unit">
                {goal}
                (
                {unit}
                )
              </small>
            </div>
          </div>
        </div>
        <div className=" d-flex flex-wrap justify-content-between align-items-center cards">
          {measurements?.map(({ date, value }) => (
            <Card
              key={`${date}${value}`}
              className="measurement__card"
              date={date}
              value={value}
              unit={unit}
            />
          ))}
        </div>
      </div>
      <Footer url={`/measurements/${id}/new`} />
    </div>
  );
};

export default Measurement;
