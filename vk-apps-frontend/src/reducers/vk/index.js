import { combineReducers } from 'redux';

import appsUserReducer from './appsUserReducer';
import appsTokenReducer from './appsTokenReducer';
import appsPayReducer from './appsPayReducer';

const vkReducer = combineReducers({
  appsUser: appsUserReducer,
  appsToken: appsTokenReducer,
  appsPay: appsPayReducer,
});

export default vkReducer;