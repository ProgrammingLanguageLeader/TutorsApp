import mockVKConnect from '@vkontakte/vkui-connect-mock';
import realVKConnect from '@vkontakte/vkui-connect';

import { DEBUG } from 'vk-apps-frontend/constants';
import { VK_APP_ID, appsConstants } from 'vk-apps-frontend/constants/vk';

const VKConnect = DEBUG ? mockVKConnect : realVKConnect;

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

const setViewSettings = () => {
  if (DEBUG) {
    return;
  }
  VKConnect.send("VKWebAppSetViewSettings", {
    "status_bar_style": "light",
    "action_bar_color": "#1f2833"
  });
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

      case 'VKWebAppDenyNotificationsFailed':
        dispatch({
          type: appsConstants.VK_DENY_NOTIFICATIONS_FAILURE,
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

      case 'VKWebAppOpenPayFormResult':
        dispatch({
          type: appsConstants.VK_PAY_SUCCESS,
          payload: data,
        });
        break;

      case 'VKWebAppOpenPayFormFailed':
        dispatch({
          type: appsConstants.VK_PAY_FAILURE,
          payload: data,
        });
        break;

      default:
        break;
    }
  });

  VKConnect.send('VKWebAppInit', {});
  setViewSettings();
};

const openPayForm = (action, params) => dispatch => {
  dispatch({
    type: appsConstants.VK_PAY_REQUEST
  });
  VKConnect.send(
    "VKWebAppOpenPayForm",
    {
      "app_id": VK_APP_ID,
      "action": action,
      "params": params
    }
  );
};

export const appsActions = {
  fetchCurrentUserInfo,
  denyNotifications,
  allowNotifications,
  init,
  openPayForm,
};