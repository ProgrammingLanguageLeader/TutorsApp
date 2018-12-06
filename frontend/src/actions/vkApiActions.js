import { vkApiRequest } from "../services/vkApi";
import { vkApiConstants } from '../constants';

const fetchUsersInfo = (accessToken, vkIds) => dispatch => {
  const fields = ["photo_100", "photo_200", "city"];
  dispatch({
    type: vkApiConstants.VK_API_USERS_GET_REQUEST,
  });
  vkApiRequest(
    'users.get', 
    {
      user_ids: vkIds.toString(),
      fields: fields.toString(),
    },
    accessToken, 
    response => {
      dispatch({
        type: vkApiConstants.VK_API_USERS_GET_FETCHED,
        payload: response,
      });
    }, 
    error => {
      dispatch({
        type: vkApiConstants.VK_API_USERS_GET_FAILED,
        payload: error
      });
    }
  );
};

const fetchNotificationStatus = (accessToken) => dispatch => {
  dispatch({
    type: vkApiConstants.VK_API_NOTIFICATION_STATUS_REQUEST,
  });
  vkApiRequest(
    'apps.isNotificationsAllowed',
    {},
    accessToken,
    response => {
      dispatch({
        type: vkApiConstants.VK_API_NOTIFICATION_STATUS_FETCHED,
        payload: response['is_allowed'],
      });
    },
    error => {
      dispatch({
        type: vkApiConstants.VK_API_NOTIFICATION_STATUS_FAILED,
        payload: error
      });
    }
  );
};

export const vkApiActions = {
  fetchUsersInfo, fetchNotificationStatus,
};