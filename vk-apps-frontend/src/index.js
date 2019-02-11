import React from 'react';
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';

import App from 'vk-apps-frontend/App';
import store from 'vk-apps-frontend/store/store';

import 'moment/locale/ru';
import '@vkontakte/vkui/dist/vkui.css';
import 'react-datetime/css/react-datetime.css'

import 'vk-apps-frontend/assets/css/index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
