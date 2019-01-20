import ApiManager from './ApiManager';

export const makeApiRequest = async (endpoint, method, options) => {
  return ApiManager.getInstance().makeRequest(endpoint, method, options);
};
