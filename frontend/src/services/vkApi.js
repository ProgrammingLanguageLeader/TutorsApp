import mockVKConnect from '../helpers/vkMockConnect';
import realVKConnect from '@vkontakte/vkui-connect';

const VKConnect = process.env.REACT_APP_DEBUG ? mockVKConnect : realVKConnect;
console.log(VKConnect === realVKConnect);
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
        VKConnect.unsubscribe(callback);
      }
    };
    VKConnect.subscribe(callback);
  }

  params['access_token'] = accessToken;
  if (params['v'] === undefined) {
    params['v'] = API_VERSION;
  }

  VKConnect.send('VKWebAppCallAPIMethod', {
    'method': method,
    'params': params,
    'request_id': requestId,
  });
};

const getNewRequestId = () => (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString();
