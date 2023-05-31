import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import App from './App';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = process.env.REACT_APP_DEPLOY;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
