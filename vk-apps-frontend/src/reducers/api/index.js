import { combineReducers } from "redux";

import lessonsReducer from "./lessonsReducer";
import notificationsReducer from "./notificationsReducer";
import tutorsReducer from "./tutorsReducer";
import usersReducer from "./usersReducer";
import vacanciesReducer from "./vacanciesReducer";
import vkAppsUsersReducer from "./vkAppsReducer";

const apiReducer = combineReducers({
  lessonsReducer,
  notificationsReducer,
  tutorsReducer,
  usersReducer,
  vacanciesReducer,
  vkAppsUsersReducer,
});

export default apiReducer;
