import ApiRequestManager from './ApiManager';

const apiRequestManager = ApiRequestManager.getInstance();

export const makeApiRequest = async (endpoint, method, options, useFormData = false) => {
  return apiRequestManager.makeRequest(endpoint, method, options, useFormData);
};

export const cancelApiRequests = () => {
  ApiRequestManager.cancelRequests();
};
