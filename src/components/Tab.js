import PropTypes from 'prop-types';
import TabInfo from './TabInfo';

const Tab = ({ title, res }) => {
  const content = res.map((item) => {
    const {
      percentage, date, title, unit, id,
    } = item;
    return (
      <TabInfo key={date} percentage={percentage} date={date} unit={unit} title={title} id={id} />
    );
  });
  return (
    <div className="tab">
      <h6 className="px-4 py-2 tab-title">{ title }</h6>
      { content }
    </div>
  );
};

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  res: PropTypes.arrayOf(PropTypes.shape({
    percentage: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default Tab;
