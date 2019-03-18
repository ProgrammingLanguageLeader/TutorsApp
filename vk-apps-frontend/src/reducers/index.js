import { combineReducers } from 'redux';

import vkReducer from './vk';
import vacanciesFilterReducer from './vacanciesFilterReducer';
import currentUserReducer from './currentUserReducer';

const rootReducer = combineReducers({
  VK: vkReducer,
  vacanciesFilter: vacanciesFilterReducer,
  currentUser: currentUserReducer,
});

export default rootReducer;