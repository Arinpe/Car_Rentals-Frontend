import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ children, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {children}
  </form>
);

Form.defaultProps = {
  children: null,
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  handleSubmit: PropTypes.func.isRequired,
};

export default Form;
