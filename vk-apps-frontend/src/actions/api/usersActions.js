import APIRequestManager from 'vk-apps-frontend/services/APIRequestManager';
import handleAPIResponse from 'vk-apps-frontend/helpers/handleAPIResponse';
import { usersConstants } from 'vk-apps-frontend/constants/api';

const requestManager = APIRequestManager.getInstance();

const getUsersList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: usersConstants.GET_USERS_LIST_REQUEST,
    });
    return requestManager.makeRequest('users/', 'get', options)
      .then(handleAPIResponse(
        usersConstants.GET_USERS_LIST_SUCCESS,
        usersConstants.GET_USERS_LIST_FAILURE,
        dispatch
      ))
  };
};

const getUser = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: usersConstants.GET_USER_REQUEST,
    });
    return requestManager.makeRequest(`users/${id}/`, 'get', options)
      .then(handleAPIResponse(
        usersConstants.GET_USER_SUCCESS,
        usersConstants.GET_USER_FAILURE,
        dispatch
      ))
  };
};

const updateUser = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: usersConstants.UPDATE_USER_REQUEST,
    });
    return requestManager.makeRequest(`users/${id}/`, 'patch', options)
      .then(handleAPIResponse(
        usersConstants.UPDATE_USER_SUCCESS,
        usersConstants.UPDATE_USER_FAILURE,
        dispatch
      ))
  };
};

const uploadAvatar = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: usersConstants.UPLOAD_AVATAR_REQUEST,
    });
    return requestManager.makeRequest(`users/${id}/upload_avatar/`, 'patch', options, true)
      .then(handleAPIResponse(
        usersConstants.UPLOAD_AVATAR_SUCCESS,
        usersConstants.UPLOAD_AVATAR_FAILURE,
        dispatch
      ))
  };
};

export const usersActions = {
  getUsersList,
  getUser,
  updateUser,
  uploadAvatar,
};