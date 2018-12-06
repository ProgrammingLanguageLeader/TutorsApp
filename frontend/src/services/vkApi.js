import mockConnect from '@vkontakte/vkui-connect-mock';
import realConnect from '@vkontakte/vkui-connect';

const connect = (process.env.REACT_APP_DEBUG) ? mockConnect : realConnect;
const API_VERSION = '5.80';

export const vkApiRequest = (
    method,
    params = {},
    accessToken = '',
    successCallback = undefined,
    errorCallback = undefined
) => {
  const requestId = getNewRequestId();
  if (successCallback !== undefined || errorCallback !== undefined) {
    const callback = event => {
      const vkEvent = event.detail;
      if (!vkEvent) {
        console.error('invalid event', event);
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
        connect.unsubscribe(callback);
      }
    };
    connect.subscribe(callback);
  }

  params['access_token'] = accessToken;
  if (params['v'] === undefined) {
    params['v'] = API_VERSION;
  }

  connect.send('VKWebAppCallAPIMethod', {
    'method': method,
    'params': params,
    'request_id': requestId,
  });
};

const getNewRequestId = () => (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString();
