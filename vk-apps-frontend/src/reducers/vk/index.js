import { combineReducers } from 'redux';

import appsUserReducer from './appsUserReducer';
import appsTokenReducer from './appsTokenReducer';
import apiUsersReducer from './apiUsersReducer';
import apiNotificationsReducer from './apiNotificationsReducer';
import appsPayReducer from './appsPayReducer';

const vkReducer = combineReducers({
  appsUserReducer,
  appsTokenReducer,
  apiUsersReducer,
  apiNotificationsReducer,
  appsPayReducer,
});

export default vkReducer;