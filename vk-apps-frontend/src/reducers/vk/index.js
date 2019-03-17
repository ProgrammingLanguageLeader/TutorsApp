import { combineReducers } from 'redux';

import appsUserReducer from './appsUserReducer';
import appsPayReducer from './appsPayReducer';
import appsNotificationsReducer from './appsNotificationsReducer';

const vkReducer = combineReducers({
  appsUser: appsUserReducer,
  appsPay: appsPayReducer,
  appsNotifications: appsNotificationsReducer,
});

export default vkReducer;