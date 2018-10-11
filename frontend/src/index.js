import React from 'react';
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';

import App from './App';
import registerServiceWorker from './sw';
import configureMockConnect from './helpers/mockConnect';
import store from './store/store';

import './index.css';

configureMockConnect();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();