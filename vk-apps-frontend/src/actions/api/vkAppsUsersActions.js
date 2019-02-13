import { vkAppsUsersConstants } from 'vk-apps-frontend/constants/api';
import { makeApiRequest } from 'vk-apps-frontend/services/api';

const createVkAppsUser = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: vkAppsUsersConstants.CREATE_VK_APPS_USER_REQUEST,
    });
    return makeApiRequest('vk_apps_users/', 'post', options)
      .then(
        response => {
          dispatch({
            type: vkAppsUsersConstants.CREATE_VK_APPS_USER_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: vkAppsUsersConstants.CREATE_VK_APPS_USER_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const getVkAppsUser = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: vkAppsUsersConstants.GET_VK_APPS_USER_REQUEST,
    });
    return makeApiRequest(`vk_apps_users/${id}/`, 'get', options)
      .then(
        response => {
          dispatch({
            type: vkAppsUsersConstants.GET_VK_APPS_USER_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: vkAppsUsersConstants.GET_VK_APPS_USER_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const deleteVkAppsUser = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: vkAppsUsersConstants.DELETE_VK_APPS_USER_REQUEST,
    });
    return makeApiRequest(`vk_apps_users/${id}/`, 'delete', options)
      .then(
        response => {
          dispatch({
            type: vkAppsUsersConstants.DELETE_VK_APPS_USER_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: vkAppsUsersConstants.DELETE_VK_APPS_USER_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const connectVkAppsUser = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: vkAppsUsersConstants.CONNECT_VK_APPS_USER_REQUEST,
    });
    return makeApiRequest(`vk_apps_users/connect/`, 'post', options)
      .then(
        response => {
          dispatch({
            type: vkAppsUsersConstants.CONNECT_VK_APPS_USER_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: vkAppsUsersConstants.CONNECT_VK_APPS_USER_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const retrieveVkAppsUserByUserId = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: vkAppsUsersConstants.RETRIEVE_VK_APPS_USER_BY_USER_ID_REQUEST,
    });
    return makeApiRequest(`vk_apps_users/by_user_id/${id}`, 'post', options)
      .then(
        response => {
          dispatch({
            type: vkAppsUsersConstants.RETRIEVE_VK_APPS_USER_BY_USER_ID_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: vkAppsUsersConstants.RETRIEVE_VK_APPS_USER_BY_USER_ID_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

export const vkAppsUsersActions = {
  createVkAppsUser,
  getVkAppsUser,
  deleteVkAppsUser,
  connectVkAppsUser,
  retrieveVkAppsUserByUserId,
};