import { combineReducers } from 'redux';

import appsUserReducer from './appsUserReducer';
import appsTokenReducer from './appsTokenReducer';
import apiUsersReducer from './apiUsersReducer';
import apiNotificationsReducer from './apiNotificationsReducer';

const vkReducer = combineReducers({
  appsUserReducer,
  appsTokenReducer,
  apiUsersReducer,
  apiNotificationsReducer,
});

export default vkReducer;
