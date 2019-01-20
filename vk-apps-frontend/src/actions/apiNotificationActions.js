import { makeApiRequest } from "../services/api";
import { apiNotificationConstants } from "../constants";

const getNotifications = (options) => {
  return async dispatch => {
    dispatch({
      type: apiNotificationConstants.GET_NOTIFICATIONS_REQUEST,
    });
    return makeApiRequest('get_notifications', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiNotificationConstants.GET_NOTIFICATIONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiNotificationConstants.GET_NOTIFICATIONS_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const markNotificationAsSeen = (options) => {
  return async dispatch => {
    dispatch({
      type: apiNotificationConstants.GET_NOTIFICATIONS_REQUEST,
    });
    return makeApiRequest('mark_notification_as_seen', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiNotificationConstants.GET_NOTIFICATIONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiNotificationConstants.GET_NOTIFICATIONS_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

export const apiNotificationActions = {
  getNotifications, markNotificationAsSeen,
};
