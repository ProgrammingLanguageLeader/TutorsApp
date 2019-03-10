import { combineReducers } from 'redux';

import apiReducer from './api';
import vkReducer from './vk';
import vacanciesFilterReducer from './vacanciesFilterReducer';
import currentUserReducer from './currentUserReducer';

const rootReducer = combineReducers({
  API: apiReducer,
  VK: vkReducer,
  vacanciesFilter: vacanciesFilterReducer,
  currentUser: currentUserReducer,
});

export default rootReducer;