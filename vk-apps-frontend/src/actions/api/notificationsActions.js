import { makeApiRequest } from 'vk-apps-frontend/services/api';
import { notificationsConstants } from 'vk-apps-frontend/constants/api';

const getNotificationsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: notificationsConstants.GET_NOTIFICATIONS_LIST_REQUEST,
    });
    return makeApiRequest('notifications/', 'get', options)
      .then(
        response => {
          dispatch({
            type: notificationsConstants.GET_NOTIFICATIONS_LIST_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: notificationsConstants.GET_NOTIFICATIONS_LIST_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const getReadNotificationsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: notificationsConstants.GET_READ_NOTIFICATIONS_LIST_REQUEST,
    });
    options.unread = false;
    return makeApiRequest('notifications/', 'get', options)
      .then(
        response => {
          dispatch({
            type: notificationsConstants.GET_READ_NOTIFICATIONS_LIST_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: notificationsConstants.GET_READ_NOTIFICATIONS_LIST_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const getUnreadNotificationsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: notificationsConstants.GET_UNREAD_NOTIFICATIONS_LIST_REQUEST,
    });
    options.unread = true;
    return makeApiRequest('notifications/', 'get', options)
      .then(
        response => {
          dispatch({
            type: notificationsConstants.GET_UNREAD_NOTIFICATIONS_LIST_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: notificationsConstants.GET_UNREAD_NOTIFICATIONS_LIST_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const getNotification = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: notificationsConstants.GET_NOTIFICATION_REQUEST,
    });
    return makeApiRequest(`notifications/${id}/`, 'get', options)
      .then(
        response => {
          dispatch({
            type: notificationsConstants.GET_NOTIFICATION_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: notificationsConstants.GET_NOTIFICATION_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const setUnreadNotification = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: notificationsConstants.SET_UNREAD_NOTIFICATION_REQUEST,
    });
    return makeApiRequest(`notifications/${id}/set_unread/`, 'patch', options)
      .then(
        response => {
          dispatch({
            type: notificationsConstants.SET_UNREAD_NOTIFICATION_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: notificationsConstants.SET_UNREAD_NOTIFICATION_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

export const notificationsActions = {
  getNotificationsList,
  getUnreadNotificationsList,
  getReadNotificationsList,
  getNotification,
  setUnreadNotification,
};
