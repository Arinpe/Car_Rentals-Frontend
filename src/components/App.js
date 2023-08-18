import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Homepage from './Homepage';
import Register from '../containers/Register';
import Login from '../containers/Login';
import Dashboard from '../containers/Cars';
import Car from '../containers/Car';
import MeasureForm from '../containers/MeasureForm';
import AppointmentForm from '../containers/AppointmentForm';
import Appointments from '../containers/Appointments';
import ProtectedRoute from './ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/dashboard" Component={Dashboard} />
      <ProtectedRoute exact path="/cars/:id" Component={Car} />
      <ProtectedRoute exact path="/measurements/categories/new" Component={MeasureForm} />
      <ProtectedRoute exact path="/cars/:id/appointment" Component={AppointmentForm} />
      <ProtectedRoute exact path="/appointments" Component={Appointments} />
    </Switch>
  </Router>
);

export default App;
