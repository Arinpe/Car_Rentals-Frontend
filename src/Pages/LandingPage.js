import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadUser } from '../actions/userAction';
import setLoadingStatus from '../actions/loadingAction';
import LoadingBar from '../components/loading';

const LandingPage = ({
  auth, loadUser, User, Loading, setLoadingStatus,
}) => {
  const loadUserProfile = () => {
    let body;
    const token = auth.getAccessToken();
    auth.getProfile((profile, error) => {
      if (error) throw new Error(error);
      body = {
        username: profile.nickname,
        email: profile.email,
      };
    });
    setTimeout(() => loadUser(body, token), 2000);
  };
  React.useEffect(() => {
    if (auth.isAuthenticated() && (Object.keys(User).length === 0 && User.constructor === Object)) {
      loadUserProfile();
      setLoadingStatus(false);
    }
  }, []);

  if (Loading) return <LoadingBar />;

  return (
    <>
      <main className="bg-image">
        <section className="banner">
          <h1>Find your beautiful houses here</h1>
          <div />
          <p>A place to live!</p>
          <Link to="/house-list" className="li-color p-4 lin">
            Check out our houses!
          </Link>
        </section>
      </main>
    </>
  );
};
LandingPage.defaultProps = {
  auth: null,
  User: null,
};
LandingPage.propTypes = {
  auth: PropTypes.object || null,
  User: PropTypes.object || null,
  loadUser: PropTypes.func.isRequired,
  Loading: PropTypes.bool.isRequired,
  setLoadingStatus: PropTypes.func.isRequired,
};
const mapStateToProps = ({ User, Loading }) => ({ User, Loading });
const mapDispatchToProps = { loadUser, setLoadingStatus };
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
