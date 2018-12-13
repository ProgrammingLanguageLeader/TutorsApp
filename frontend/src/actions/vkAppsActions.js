import mockVKConnect from '../helpers/vkMockConnect';
import realVKConnect from '@vkontakte/vkui-connect';

import { vkAppsConstants } from '../constants';

const VKConnect = (process.env.REACT_APP_DEBUG) ? mockVKConnect : realVKConnect;

const fetchAccessToken = () => dispatch => {
  const appId = 6700618;

  dispatch({
    type: vkAppsConstants.VK_GET_ACCESS_TOKEN_REQUEST
  });
  VKConnect.send('VKWebAppGetAuthToken', {'app_id': appId});
};

const denyNotifications = () => dispatch => {
  dispatch({
    type: vkAppsConstants.VK_DENY_NOTIFICATIONS_REQUEST,
  });
  VKConnect.send('VKWebAppDenyNotifications', {});
};

const allowNotifications = () => dispatch => {
  dispatch({
    type: vkAppsConstants.VK_ALLOW_NOTIFICATIONS_REQUEST,
  });
  VKConnect.send('VKWebAppAllowNotifications', {});
};

const fetchCurrentUserInfo = () => dispatch => {
  dispatch({
    type: vkAppsConstants.VK_GET_USER_INFO_REQUEST,
  });
  VKConnect.send("VKWebAppGetUserInfo", {});
};

const init = () => dispatch => {
  dispatch({
    type: vkAppsConstants.VK_INIT,
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
          type: vkAppsConstants.VK_ALLOW_NOTIFICATIONS_SUCCESS,
        });
        break;

      case 'VKWebAppAllowNotificationsFailed':
        dispatch({
          type: vkAppsConstants.VK_ALLOW_NOTIFICATIONS_FAILURE,
          payload: data,
        });
        break;

      case 'VKWebAppDenyNotificationsResult':
        dispatch({
          type: vkAppsConstants.VK_DENY_NOTIFICATIONS_SUCCESS,
        });
        break;

      case 'VKWebAppDinyNotificationsFailed':
        dispatch({
          type: vkAppsConstants.VK_DENY_NOTIFICATIONS_FAILURE
        });
        break;

      case 'VKWebAppAccessTokenReceived':
        dispatch({
          type: vkAppsConstants.VK_GET_ACCESS_TOKEN_FETCHED,
          payload: data['access_token']
        });
        break;

      case 'VKWebAppAccessTokenFailed':
        dispatch({
          type: vkAppsConstants.VK_GET_ACCESS_TOKEN_FAILED,
          payload: data,
        });
        break;

      case 'VKWebAppGetUserInfoResult':
        dispatch({
          type: vkAppsConstants.VK_GET_USER_INFO_FETCHED,
          payload: data,
        });
        break;

      case 'VKWebAppGetUserInfoFailed':
        dispatch({
          type: vkAppsConstants.VK_GET_USER_INFO_FAILED,
          payload: data,
        });
        break;

      default:
        break;
    }
  });

  VKConnect.send('VKWebAppInit', {});
};

export const vkAppsActions = {
  fetchAccessToken, fetchCurrentUserInfo, denyNotifications, allowNotifications, init
};