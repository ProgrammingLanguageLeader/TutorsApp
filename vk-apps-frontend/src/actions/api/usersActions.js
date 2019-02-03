import { makeApiRequest } from 'vk-apps-frontend/services/api';
import { usersConstants } from 'vk-apps-frontend/constants/api';

const getUsersList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: usersConstants.GET_USERS_LIST_REQUEST,
    });
    return makeApiRequest('users/', 'get', options)
      .then(
        response => {
          dispatch({
            type: usersConstants.GET_USERS_LIST_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: usersConstants.GET_USERS_LIST_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const getUser = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: usersConstants.GET_USER_REQUEST,
    });
    return makeApiRequest(`users/${id}/`, 'get', options)
      .then(
        response => {
          dispatch({
            type: usersConstants.GET_USER_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: usersConstants.GET_USER_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const updateUser = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: usersConstants.UPDATE_USER_REQUEST,
    });
    return makeApiRequest(`users/${id}/`, 'patch', options)
      .then(
        response => {
          dispatch({
            type: usersConstants.UPDATE_USER_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: usersConstants.UPDATE_USER_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const deleteUser = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: usersConstants.DELETE_USER_REQUEST,
    });
    return makeApiRequest(`users/${id}/`, 'delete', options)
      .then(
        response => {
          dispatch({
            type: usersConstants.DELETE_USER_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: usersConstants.DELETE_USER_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const uploadAvatar = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: usersConstants.UPLOAD_AVATAR_REQUEST,
    });
    return makeApiRequest(`users/${id}/upload_avatar/`, 'patch', options, true)
      .then(
        response => {
          dispatch({
            type: usersConstants.UPLOAD_AVATAR_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: usersConstants.UPLOAD_AVATAR_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

export const usersActions = {
  getUsersList,
  getUser,
  updateUser,
  deleteUser,
  uploadAvatar,
};
