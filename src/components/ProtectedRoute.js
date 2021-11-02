/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Redirect, Route } from 'react-router-dom';
import { getHeaders } from '../services/common';

const ProtectedRoute = ({ Component, ...rest }) => {
  const headers = getHeaders();
  if (!headers || !Object.keys(headers).length) {
    toast.error('You need to log in');
    return <Redirect to="/login" />;
  }
  return (
    <Route
      {...rest}
      render={() => (
        <Component />
      )}
    />
  );
};

ProtectedRoute.propTypes = {
  Component: PropTypes.func.isRequired,
};

export default ProtectedRoute;
