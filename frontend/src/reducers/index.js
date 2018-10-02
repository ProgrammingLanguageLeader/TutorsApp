import { combineReducers } from 'redux';

import apiReducer from './api';
import vkReducer from './vk';

const rootReducer = combineReducers({
  apiReducer,
  vkReducer,
});

export default rootReducer;