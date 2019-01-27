import mockVKConnect from '@vkontakte/vkui-connect-mock';
import realVKConnect from '@vkontakte/vkui-connect';

import { DEBUG } from 'constants';
import { VK_APP_ID, appsConstants } from 'constants/vk';

const VKConnect = DEBUG ? mockVKConnect : realVKConnect;

const fetchAccessToken = () => dispatch => {
  const scope = "";
  dispatch({
    type: appsConstants.VK_GET_ACCESS_TOKEN_REQUEST
  });
  VKConnect.send('VKWebAppGetAuthToken', {'app_id': VK_APP_ID, 'scope': scope});
};

const denyNotifications = () => dispatch => {
  dispatch({
    type: appsConstants.VK_DENY_NOTIFICATIONS_REQUEST,
  });
  VKConnect.send('VKWebAppDenyNotifications', {});
};

const allowNotifications = () => dispatch => {
  dispatch({
    type: appsConstants.VK_ALLOW_NOTIFICATIONS_REQUEST,
  });
  VKConnect.send('VKWebAppAllowNotifications', {});
};

const fetchCurrentUserInfo = () => dispatch => {
  dispatch({
    type: appsConstants.VK_GET_USER_INFO_REQUEST,
  });
  VKConnect.send("VKWebAppGetUserInfo", {});
};

const init = () => dispatch => {
  dispatch({
    type: appsConstants.VK_INIT,
  });
  VKConnect.subscribe(event => {
    const vkEvent = event.detail;
    if (!vkEvent) {
      console.error('invalid event', event);
      return;
    }

    const type = vkEvent['type'];
    const data = vkEvent['data'];

    switch (type) {
      case 'VKWebAppAllowNotificationsResult':
        dispatch({
          type: appsConstants.VK_ALLOW_NOTIFICATIONS_SUCCESS,
        });
        break;

      case 'VKWebAppAllowNotificationsFailed':
        dispatch({
          type: appsConstants.VK_ALLOW_NOTIFICATIONS_FAILURE,
          payload: data,
        });
        break;

      case 'VKWebAppDenyNotificationsResult':
        dispatch({
          type: appsConstants.VK_DENY_NOTIFICATIONS_SUCCESS,
        });
        break;

      case 'VKWebAppDinyNotificationsFailed':
        dispatch({
          type: appsConstants.VK_DENY_NOTIFICATIONS_FAILURE
        });
        break;

      case 'VKWebAppAccessTokenReceived':
        dispatch({
          type: appsConstants.VK_GET_ACCESS_TOKEN_FETCHED,
          payload: data['access_token']
        });
        break;

      case 'VKWebAppAccessTokenFailed':
        dispatch({
          type: appsConstants.VK_GET_ACCESS_TOKEN_FAILED,
          payload: data,
        });
        break;

      case 'VKWebAppGetUserInfoResult':
        dispatch({
          type: appsConstants.VK_GET_USER_INFO_FETCHED,
          payload: data,
        });
        break;

      case 'VKWebAppGetUserInfoFailed':
        dispatch({
          type: appsConstants.VK_GET_USER_INFO_FAILED,
          payload: data,
        });
        break;

      default:
        break;
    }
  });

  VKConnect.send('VKWebAppInit', {});
};

export const appsActions = {
  fetchAccessToken,
  fetchCurrentUserInfo,
  denyNotifications,
  allowNotifications,
  init
};