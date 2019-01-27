import { combineReducers } from 'redux';

import apiReducer from './api';
import vkReducer from './vk';
import locationReducer from './locationReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
  apiReducer,
  vkReducer,
  locationReducer,
  filterReducer,
});

export default rootReducer;