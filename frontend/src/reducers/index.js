import { combineReducers } from 'redux';

import apiReducer from './api';
import vkReducer from './vk';
import locationReducer from './location';

const rootReducer = combineReducers({
  apiReducer,
  vkReducer,
  locationReducer,
});

export default rootReducer;