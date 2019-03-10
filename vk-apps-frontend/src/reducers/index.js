import { combineReducers } from 'redux';

import apiReducer from './api';
import vkReducer from './vk';
import filterReducer from './filterReducer';
import currentUserReducer from './currentUser';

const rootReducer = combineReducers({
  API: apiReducer,
  VK: vkReducer,
  vacanciesFilter: filterReducer,
  currentUser: currentUserReducer,
});

export default rootReducer;