import { combineReducers } from 'redux';

import apiLessonApplicationReducer from './apiLessonApplicationReducer';
import apiStudentApplicationReducer from './apiStudentApplicationReducer';
import apiPaymentApplicationReducer from './apiPaymentApplicationReducer';
import apiLessonReducer from './apiLessonReducer';
import apiNotificationReducer from './apiNotificationReducer';
import apiProfileReducer from './apiProfileReducer';
import apiStudentsReducer from './apiStudentsReducer';
import apiVacancyReducer from './apiVacancyReducer';
import apiVacanciesReducer from './apiVacanciesReducer';
import vkAppsUserReducer from './vkAppsUserReducer';
import vkAppsTokenReducer from './vkAppsTokenReducer';
import vkApiUsersReducer from './vkApiUsersReducer';
import vkApiNotificationsReducer from './vkApiNotificationsReducer';
import locationReducer from './locationReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
  apiLessonApplicationReducer,
  apiStudentApplicationReducer,
  apiPaymentApplicationReducer,
  apiLessonReducer,
  apiNotificationReducer,
  apiProfileReducer,
  apiStudentsReducer,
  apiVacancyReducer,
  apiVacanciesReducer,
  vkAppsUserReducer,
  vkAppsTokenReducer,
  vkApiUsersReducer,
  vkApiNotificationsReducer,
  locationReducer,
  filterReducer,
});

export default rootReducer;