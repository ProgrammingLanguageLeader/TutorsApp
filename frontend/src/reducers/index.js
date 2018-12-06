import { combineReducers } from 'redux';

import apiApplicationReducer from './apiApplicationReducer';
import apiLessonReducer from './apiLessonReducer';
import apiNotificationReducer from './apiNotificationReducer';
import apiProfileReducer from './apiProfileReducer';
import apiStudentsReducer from './apiStudentsReducer';
import apiVacancyReducer from './apiVacancyReducer';
import vkAppsReducer from './vkAppsReducer';
import vkApiReducer from './vkApiReducer';
import locationReducer from './locationReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
  apiApplicationReducer,
  apiLessonReducer,
  apiNotificationReducer,
  apiProfileReducer,
  apiStudentsReducer,
  apiVacancyReducer,
  vkAppsReducer,
  vkApiReducer,
  locationReducer,
  filterReducer,
});

export default rootReducer;