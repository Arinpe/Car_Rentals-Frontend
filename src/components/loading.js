import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => (
  <div className="spin bg-1">
    <Loader type="Puff" color="#00BFFF" timeout={3000} />
  </div>
);

export default Loading;
