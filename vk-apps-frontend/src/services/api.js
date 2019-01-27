import ApiRequestManager from './ApiManager';

const apiRequestManager = ApiRequestManager.getInstance();

export const makeApiRequest = async (endpoint, method, options) => {
  return apiRequestManager.makeRequest(endpoint, method, options);
};

export const cancelApiRequests = () => {
  ApiRequestManager.cancelRequests();
};
