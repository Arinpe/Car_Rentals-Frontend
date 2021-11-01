import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingBar from '../components/Loading';
import { loadUser } from '../redux/actions/userAction';
import setLoadingStatus from '../redux/actions/loadingAction';

const HomePage = ({
  auth,
  loadUser,
  User,
  setLoadingStatus,
  Loading,
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
    setTimeout(() => loadUser(body, token), 1000);
  };

  React.useEffect(() => {
    if (auth.isAuthenticated() && (Object.keys(User).length === 0 && User.constructor === Object)) {
      loadUserProfile();
      setLoadingStatus(false);
    }
  }, []);

  if (Loading) return <LoadingBar />;

  return (
    <main className="defaultHero d-flex align-items-center justify-content-center px-4 px-md-0">
      <section className="banner text-white">
        <h1>Welcome to Drive Super Cars</h1>
        <div />
        <p>Your home of mind-blowing rides</p>
        <Link to="/car-list" className="banner-btn">
          our cars
        </Link>
      </section>
    </main>
  );
};

HomePage.defaultProps = {
  auth: null,
  User: null,
};

HomePage.propTypes = {
  auth: PropTypes.object || null,
  User: PropTypes.object || null,
  loadUser: PropTypes.func.isRequired,
  Loading: PropTypes.bool.isRequired,
  setLoadingStatus: PropTypes.func.isRequired,
};

const mapStateToProps = ({ User, Loading }) => ({ User, Loading });

const mapDispatchToProps = { loadUser, setLoadingStatus };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
