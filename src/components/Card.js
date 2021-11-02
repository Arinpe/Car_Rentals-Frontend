import PropTypes from 'prop-types';
import { formatDate } from '../services/common';

const Card = ({ date, value, unit }) => (
  <div className="d-flex flex-column py-3 px-3 align-items-center justify-content-between mt-3 mx-2 measurement__card">
    <p className="mb-0">{formatDate(new Date(date))}</p>
    <p className="mb-0">
      {parseFloat(value).toFixed(1)}
      {unit}
    </p>
  </div>
);

Card.propTypes = {
  date: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
export default Card;
