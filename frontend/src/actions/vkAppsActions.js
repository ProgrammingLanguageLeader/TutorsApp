import mockConnect from '@vkontakte/vkui-connect-mock';
import realConnect from '@vkontakte/vkui-connect';

import { vkAppsConstants } from '../constants';

const connect = (process.env.REACT_APP_DEBUG) ? mockConnect : realConnect;

const fetchAccessToken = () => () => {
  const appId = 6700618;
  connect.send('VKWebAppGetAuthToken', {'app_id': appId});
};

const denyNotifications = () => dispatch => {
  dispatch({
    type: vkAppsConstants.VK_DENY_NOTIFICATIONS,
  });
  connect.send('VKWebAppDenyNotifications', {});
};

const allowNotifications = () => dispatch => {
  dispatch({
    type: vkAppsConstants.VK_ALLOW_NOTIFICATIONS,
  });
  connect.send('VKWebAppAllowNotifications', {});
};

const fetchCurrentUserInfo = () => dispatch => {
  dispatch({
    type: vkAppsConstants.VK_GET_USER_INFO_REQUEST,
  });
  connect.send("VKWebAppGetUserInfo", {});
};

const init = () => dispatch => {
  dispatch({
    type: vkAppsConstants.VK_INIT,
  });
  connect.subscribe(event => {
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
          type: vkAppsConstants.VK_NOTIFICATION_STATUS_FETCHED,
          payload: true,
        });
        break;

      case 'VKWebAppDenyNotificationsResult':
        dispatch({
          type: vkAppsConstants.VK_NOTIFICATION_STATUS_FETCHED,
          payload: false,
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

  connect.send('VKWebAppInit', {});
};

export const vkAppsActions = {
  fetchAccessToken, fetchCurrentUserInfo, denyNotifications, allowNotifications, init
};