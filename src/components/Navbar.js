import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ auth, Loading }) => {
  const { isAuthenticated, login, logout } = auth;

  if (Loading) return null;

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary p-2 px-md-5">
        <Link to="/" className="navbar-brand color">
          TeeCars
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto align-items-center">
            <Link to="/" className="nav-item nav-link li-color">
              Home
              {' '}
              <span className="sr-only" />
            </Link>
            {isAuthenticated() && (
              <Link to="/house-list" className="nav-item nav-link li-color">
                Houses
              </Link>
            )}
            {isAuthenticated() && (
              <Link to="/favourite-list" className="nav-item nav-link li-color">
                Favourites
              </Link>
            )}
            <button
              type="button"
              className="nav-item nav-link text-white btn-success"
              onClick={isAuthenticated() ? logout : login}
            >
              {isAuthenticated() ? 'Log Out' : 'Log In'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  auth: PropTypes.func.isRequired,
  Loading: PropTypes.bool.isRequired,
};
const mapStateToProps = ({ User, Loading }) => ({ User, Loading });
export default connect(mapStateToProps)(Navbar);
