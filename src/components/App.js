import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LandingPage from '../Pages/LandingPage';
import Error from '../Pages/ErrorPage';
import Auth from '../Auth/auth';
import Callback from './callback';
import Navbar from './Navbar';
import HouseList from '../containers/HouseList';
import HousePage from './House';
import FavouriteList from '../containers/Favouritelist';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const history = useHistory();
  const auth = new Auth(history);
  return (
    <>
      <Navbar auth={auth} />
      <Switch>
        <Route path="/" exact render={() => <LandingPage auth={auth} />} />
        <Route path="/callback" render={() => <Callback auth={auth} />} />
        <Route
          path="/house-list"
          // eslint-disable-next-line no-confusing-arrow
          render={() => auth.isAuthenticated() ? <HouseList auth={auth} /> : auth.login()}
        />
        <Route
          path="/house/:id"
          // eslint-disable-next-line no-confusing-arrow
          render={() => auth.isAuthenticated() ? <HousePage auth={auth} /> : auth.login()}
        />
        <Route
          path="/favourite-list"
          // eslint-disable-next-line no-confusing-arrow
          render={() => auth.isAuthenticated() ? <FavouriteList auth={auth} /> : auth.login()}
        />
        <Route component={Error} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
}
export default App;
