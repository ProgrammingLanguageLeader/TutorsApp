import mockConnect from '@vkontakte/vkui-connect-mock';
import realConnect from '@vkontakte/vkui-connect';

import { vkConstants } from '../constants/vk';

const connect = (process.env.REACT_APP_DEBUG) ? mockConnect : realConnect;

const API_VERSION = '5.80';

const fetchAccessToken = () => async () => {
  // TODO: use system environment to hide App ID
  const appId = process.env.REACT_APP_ID || 6700618;
  connect.send('VKWebAppGetAuthToken', {'app_id': appId, "scope": "notify,friends,offline"});
}

const fetchNotificationStatus = (accessToken) => async (dispatch) => {
  apiRequest('apps.isNotificationsAllowed', {}, accessToken, response => {
    dispatch({
      type: vkConstants.VK_NOTIFICATION_STATUS_FETCHED,
      notificationStatus: response['is_allowed'],
    });
    }, 
    error => {
      dispatch({
        type: vkConstants.VK_NOTIFICATION_STATUS_FAILED, 
        error: error
      });
    }
  );
}

const denyNotifications = () => async () => {
  connect.send('VKWebAppDenyNotifications', {});
}

const allowNotifications = () => async () => {
  connect.send('VKWebAppAllowNotifications', {});
}

const init = () => async (dispatch) => {
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
          type: vkConstants.VK_NOTIFICATION_STATUS_FETCHED,
          notificationStatus: true,
        });
        break;

      case 'VKWebAppDenyNotificationsResult':
        dispatch({
          type: vkConstants.VK_NOTIFICATION_STATUS_FETCHED,
          notificationStatus: false,
        });
        break;

      case 'VKWebAppAccessTokenReceived':
        dispatch({
          type: vkConstants.VK_GET_ACCESS_TOKEN_FETCHED,
          accessToken: data['access_token']
        });
        break;

      case 'VKWebAppAccessTokenFailed':
        dispatch({
          type: vkConstants.VK_GET_ACCESS_TOKEN_FAILED,
          logs: data['error_type'],
        });
        break;

      case 'VKWebAppUpdateInsets':
        dispatch({
          type: vkConstants.VK_INSETS_FETCHED,
          insets: data.insets
        });
        break;

      default:
        break;
    }
  });

  connect.send('VKWebAppInit', {});
}

const apiRequest = (method, params = {}, accessToken = '', successCallback = undefined, errorCallback = undefined) => {
  const requestId = getNewRequestId();
  if (successCallback !== undefined || errorCallback !== undefined) {
    const clb = function callback(e) {
      const vkEvent = e.detail;
      if (!vkEvent) {
        console.error('invalid event', e);
        return;
      }

      const type = vkEvent['type'];
      const data = vkEvent['data'];

      let found = false;
      if ('VKWebAppCallAPIMethodResult' === type && data['request_id'] === requestId) {
        if (successCallback !== undefined) {
            successCallback(data['response']);
        }
        found = true;
      } else if ('VKWebAppCallAPIMethodFailed' === type && data['request_id'] === requestId) {
        if (errorCallback !== undefined) {
          errorCallback(data);
        }

        found = true;
      }

      if (found) {
        connect.unsubscribe(clb);
      }

    };
    connect.subscribe(clb);
  }

  params['access_token'] = accessToken;
  if (params['v'] === undefined) {
    params['v'] = API_VERSION;
  }

  connect.send('VKWebAppCallAPIMethod', {
    'method': method,
    'params': params,
    'request_id': requestId
  });
}

const getNewRequestId = () => (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString();


export const vkActions = {
  fetchAccessToken, fetchNotificationStatus,
  denyNotifications, allowNotifications,
  init
};