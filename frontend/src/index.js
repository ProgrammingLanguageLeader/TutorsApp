import React from 'react';
import ReactDOM from 'react-dom'; 
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import App from './App';
import registerServiceWorker from './sw';
import configureStore from './store/configureStore';
import history from './helpers/history';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App store={store} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();