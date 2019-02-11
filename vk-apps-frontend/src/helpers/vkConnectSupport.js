import mockVKConnect from '@vkontakte/vkui-connect-mock';
import realVKConnect from '@vkontakte/vkui-connect';

import { DEBUG } from 'vk-apps-frontend/constants';

const VKConnect = DEBUG ? mockVKConnect : realVKConnect;

const doesClientSupportVkConnect = () => {
  return VKConnect.supports('VKWebAppInit');
};

export default doesClientSupportVkConnect;