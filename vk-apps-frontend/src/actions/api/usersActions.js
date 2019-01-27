import { makeApiRequest } from 'services/api';
import { usersConstants } from 'constants/api';

const getUsersList = (options) => {
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

const getUser = (id, options) => {
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

const updateUser = (id, options) => {
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

const deleteUser = (id, options) => {
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

export const usersActions = {
  getUsersList,
  getUser,
  updateUser,
  deleteUser,
};
