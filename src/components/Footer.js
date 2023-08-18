import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Footer = ({ url }) => (
  <footer className="d-flex align-items-center justify-content-center footer">
    <Link to={url}><span className="plus-icon"><AiOutlinePlus /></span></Link>
  </footer>
);

Footer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Footer;
