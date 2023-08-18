import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const Card = ({ imgSrc, date, city }) => {
  const formattedDate = formatDistanceToNow(new Date(date));
  return (
    <div className="card car_card">
      <img src={imgSrc} className="card-img-top" alt="car" />
      <div className="card-body">
        <p className="card-text">
          {formattedDate}
          {' '}
          @
          {' '}
          {city}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};
export default Card;
