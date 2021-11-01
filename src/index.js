import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import App from './components/App';
import ConfigureStore from './redux/configureStore';

const store = ConfigureStore();

render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Router>
        <App />
      </Router>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
