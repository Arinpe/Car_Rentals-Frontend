import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from './loading';
import setLoadingStatus from '../actions/loadingAction';

function Callback({ auth, setLoadingStatus, Loading }) {
  const location = useLocation();
  React.useEffect(() => {
    if (/access_token|id_token|error/.test(location.hash)) {
      setLoadingStatus(true);
      auth.handleAuthentication();
    }
  }, [location]);
  if (Loading) return <LoadingBar />;
  return null;
}
Callback.defaultProps = {
  auth: null,
};
Callback.propTypes = {
  auth: PropTypes.object || null,
  setLoadingStatus: PropTypes.func.isRequired,
  Loading: PropTypes.bool.isRequired,
};
const mapStateToProps = ({ Loading }) => ({ Loading });
const mapDispatchToProps = { setLoadingStatus };
export default connect(mapStateToProps, mapDispatchToProps)(Callback);
