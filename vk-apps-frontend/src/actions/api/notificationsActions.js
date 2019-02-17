import APIRequestManager from 'vk-apps-frontend/services/APIRequestManager';
import handleAPIResponse from 'vk-apps-frontend/helpers/handleAPIResponse';
import { notificationsConstants } from 'vk-apps-frontend/constants/api';

const requestManager = APIRequestManager.getInstance();

const getNotificationsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: notificationsConstants.GET_NOTIFICATIONS_LIST_REQUEST,
    });
    return requestManager.makeRequest('notifications/', 'get', options)
      .then(handleAPIResponse(
        notificationsConstants.GET_NOTIFICATIONS_LIST_SUCCESS,
        notificationsConstants.GET_NOTIFICATIONS_LIST_FAILURE,
        dispatch
      ))
  };
};

const getReadNotificationsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: notificationsConstants.GET_READ_NOTIFICATIONS_LIST_REQUEST,
    });
    options.unread = false;
    return requestManager.makeRequest('notifications/', 'get', options)
      .then(handleAPIResponse(
        notificationsConstants.GET_READ_NOTIFICATIONS_LIST_SUCCESS,
        notificationsConstants.GET_READ_NOTIFICATIONS_LIST_FAILURE,
        dispatch
      ))
  };
};

const getUnreadNotificationsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: notificationsConstants.GET_UNREAD_NOTIFICATIONS_LIST_REQUEST,
    });
    options.unread = true;
    return requestManager.makeRequest('notifications/', 'get', options)
      .then(handleAPIResponse(
        notificationsConstants.GET_UNREAD_NOTIFICATIONS_LIST_SUCCESS,
        notificationsConstants.GET_UNREAD_NOTIFICATIONS_LIST_FAILURE,
        dispatch
      ))
  };
};

const getNotification = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: notificationsConstants.GET_NOTIFICATION_REQUEST,
    });
    return requestManager.makeRequest(`notifications/${id}/`, 'get', options)
      .then(handleAPIResponse(
        notificationsConstants.GET_NOTIFICATION_SUCCESS,
        notificationsConstants.GET_NOTIFICATION_FAILURE,
        dispatch
      ))
  };
};

const setUnreadNotification = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: notificationsConstants.SET_UNREAD_NOTIFICATION_REQUEST,
    });
    return requestManager.makeRequest(`notifications/${id}/set_unread/`, 'patch', options)
      .then(handleAPIResponse(
        notificationsConstants.SET_UNREAD_NOTIFICATION_SUCCESS,
        notificationsConstants.SET_UNREAD_NOTIFICATION_FAILURE,
        dispatch
      ))
  };
};

export const notificationsActions = {
  getNotificationsList,
  getUnreadNotificationsList,
  getReadNotificationsList,
  getNotification,
  setUnreadNotification,
};