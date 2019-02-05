import { combineReducers } from 'redux';

import apiReducer from './api';
import vkReducer from './vk';
import filterReducer from './filterReducer';
import currentUserReducer from './currentUser';

const rootReducer = combineReducers({
  apiReducer,
  vkReducer,
  filterReducer,
  currentUserReducer,
});

export default rootReducer;