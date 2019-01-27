import mockVKConnect from '@vkontakte/vkui-connect-mock';
import realVKConnect from '@vkontakte/vkui-connect';

import { DEBUG } from 'constants';
import { VK_API_VERSION } from 'constants/vk';
import { configureVkMockConnect } from 'helpers/vkMockConnect';

const VKConnect = developmentMode ? mockVKConnect : realVKConnect;
if (DEBUG) {
  configureVkMockConnect();
}

export const vkApiRequest = (
    method,
    params = {},
    accessToken = '',
    successCallback = undefined,
    errorCallback = undefined
) => {
  const requestId = DEBUG ? "324nnefj" : getNewRequestId();
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
    params['v'] = VK_API_VERSION;
  }

  VKConnect.send('VKWebAppCallAPIMethod', {
    'method': method,
    'params': params,
    'request_id': requestId,
  });
};

const getNewRequestId = () => (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString();
