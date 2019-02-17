import Immutable from 'seamless-immutable';

import { notificationsConstants } from 'vk-apps-frontend/constants/api';

const initialState = Immutable({
  notification: null,

  notifications: [],
  notificationsCount: 0,
  notificationsNext: null,
  notificationsPrevious: null,

  unreadNotifications: [],
  unreadNotificationsCount: 0,
  unreadNotificationsNext: null,
  unreadNotificationsPrevious: null,

  readNotifications: [],
  readNotificationsCount: 0,
  readNotificationsNext: null,
  readNotificationsPrevious: null,

  fetching: false,
  errors: null,
  success: null,
});

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationsConstants.GET_NOTIFICATIONS_LIST_REQUEST:
    case notificationsConstants.GET_UNREAD_NOTIFICATIONS_LIST_REQUEST:
    case notificationsConstants.GET_READ_NOTIFICATIONS_LIST_REQUEST:
    case notificationsConstants.GET_NOTIFICATION_REQUEST:
    case notificationsConstants.SET_UNREAD_NOTIFICATION_REQUEST:
      return state.merge({
        fetching: true,
      });

    case notificationsConstants.SET_UNREAD_NOTIFICATION_SUCCESS:
      return state.merge({
        success: true,
        errors: null,
        fetching: false,
      });

    case notificationsConstants.GET_NOTIFICATION_SUCCESS:
      return state.merge({
        notification: action.payload,
        errors: null,
        fetching: false,
      });

    case notificationsConstants.GET_NOTIFICATIONS_LIST_SUCCESS:
      return state.merge({
        notifications: action.payload.results,
        notificationsCount: action.payload.count,
        notificationsNext: action.payload.next,
        notificationsPrevious: action.payload.previous,
        errors: null,
        fetching: false,
      });

    case notificationsConstants.GET_UNREAD_NOTIFICATIONS_LIST_SUCCESS:
      return state.merge({
        unreadNotifications: action.payload.results,
        unreadNotificationsCount: action.payload.count,
        unreadNotificationsNext: action.payload.next,
        unreadNotificationsPrevious: action.payload.previous,
        fetching: false,
        errors: null,
      });

    case notificationsConstants.GET_READ_NOTIFICATIONS_LIST_SUCCESS:
      return state.merge({
        readNotifications: action.payload.results,
        readNotificationsCount: action.payload.count,
        readNotificationsNext: action.payload.next,
        readNotificationsPrevious: action.payload.previous,
        fetching: false,
        errors: null,
      });

    case notificationsConstants.GET_NOTIFICATIONS_LIST_FAILURE:
    case notificationsConstants.GET_UNREAD_NOTIFICATIONS_LIST_FAILURE:
    case notificationsConstants.GET_READ_NOTIFICATIONS_LIST_FAILURE:
    case notificationsConstants.GET_NOTIFICATION_FAILURE:
    case notificationsConstants.SET_UNREAD_NOTIFICATION_FAILURE:
      return state.merge({
        errors: action.payload,
        success: null,
        fetching: false,
      });

    default:
      return state;
  }
};

export default notificationsReducer;