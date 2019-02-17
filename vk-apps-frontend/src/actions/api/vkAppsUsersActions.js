import APIRequestManager from 'vk-apps-frontend/services/APIRequestManager';
import handleAPIResponse from 'vk-apps-frontend/helpers/handleAPIResponse';
import { vkAppsUsersConstants } from 'vk-apps-frontend/constants/api';

const requestManager = APIRequestManager.getInstance();

const createVkAppsUser = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: vkAppsUsersConstants.CREATE_VK_APPS_USER_REQUEST,
    });
    return requestManager.makeRequest('vk_apps_users/', 'post', options)
      .then(handleAPIResponse(
        vkAppsUsersConstants.CREATE_VK_APPS_USER_SUCCESS,
        vkAppsUsersConstants.CREATE_VK_APPS_USER_FAILURE,
        dispatch
      ))
  };
};

const getVkAppsUser = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: vkAppsUsersConstants.GET_VK_APPS_USER_REQUEST,
    });
    return requestManager.makeRequest(`vk_apps_users/${id}/`, 'get', options)
      .then(handleAPIResponse(
        vkAppsUsersConstants.GET_VK_APPS_USER_SUCCESS,
        vkAppsUsersConstants.GET_VK_APPS_USER_FAILURE,
        dispatch
      ))
  };
};

const deleteVkAppsUser = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: vkAppsUsersConstants.DELETE_VK_APPS_USER_REQUEST,
    });
    return requestManager.makeRequest(`vk_apps_users/${id}/`, 'delete', options)
      .then(handleAPIResponse(
        vkAppsUsersConstants.DELETE_VK_APPS_USER_SUCCESS,
        vkAppsUsersConstants.DELETE_VK_APPS_USER_FAILURE,
        dispatch
      ))
  };
};

const connectVkAppsUser = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: vkAppsUsersConstants.CONNECT_VK_APPS_USER_REQUEST,
    });
    return requestManager.makeRequest(`vk_apps_users/connect/`, 'post', options)
      .then(handleAPIResponse(
        vkAppsUsersConstants.CONNECT_VK_APPS_USER_SUCCESS,
        vkAppsUsersConstants.CONNECT_VK_APPS_USER_FAILURE,
        dispatch
      ))
  };
};

const retrieveVkAppsUserByUserId = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: vkAppsUsersConstants.RETRIEVE_VK_APPS_USER_BY_USER_ID_REQUEST,
    });
    return requestManager.makeRequest(`vk_apps_users/by_user_id/${id}`, 'get', options)
      .then(handleAPIResponse(
        vkAppsUsersConstants.RETRIEVE_VK_APPS_USER_BY_USER_ID_SUCCESS,
        vkAppsUsersConstants.RETRIEVE_VK_APPS_USER_BY_USER_ID_FAILURE,
        dispatch
      ))
  };
};

export const vkAppsUsersActions = {
  createVkAppsUser,
  getVkAppsUser,
  deleteVkAppsUser,
  connectVkAppsUser,
  retrieveVkAppsUserByUserId,
};