import { makeApiRequest } from 'services/api';
import { notificationsConstants } from 'constants';

const getNotifications = (options) => {
  return async dispatch => {
    dispatch({
      type: notificationsConstants.GET_NOTIFICATIONS_REQUEST,
    });
    return makeApiRequest('get_notifications', 'get', options)
      .then(
        response => {
          dispatch({
            type: notificationsConstants.GET_NOTIFICATIONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: notificationsConstants.GET_NOTIFICATIONS_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const markNotificationAsSeen = (options) => {
  return async dispatch => {
    dispatch({
      type: notificationsConstants.GET_NOTIFICATIONS_REQUEST,
    });
    return makeApiRequest('mark_notification_as_seen', 'post', options)
      .then(
        response => {
          dispatch({
            type: notificationsConstants.GET_NOTIFICATIONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: notificationsConstants.GET_NOTIFICATIONS_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

export const notificationsActions = {
  getNotifications, markNotificationAsSeen,
};
