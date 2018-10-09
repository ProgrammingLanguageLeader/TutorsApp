import { combineReducers } from 'redux';

import apiReducer from './api';
import vkReducer from './vk';
import locationReducer from './location';
import filterReducer from './filter';

const rootReducer = combineReducers({
  apiReducer,
  vkReducer,
  locationReducer,
  filterReducer,
});

export default rootReducer;