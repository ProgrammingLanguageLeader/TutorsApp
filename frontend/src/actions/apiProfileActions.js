import { makeApiRequest } from "../services/api";
import { apiProfileConstants } from "../constants/apiProfileConstants";

const createProfile = (options) => {
  return async dispatch => {
    dispatch({
      type: apiProfileConstants.CREATE_PROFILE_REQUEST,
    });
    return makeApiRequest('create_profile', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiProfileConstants.CREATE_PROFILE_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiProfileConstants.CREATE_PROFILE_FAILURE,
          payload: errors,
        });
      }
    )
  };
};
  
const updateProfile = (options) => {
  return async dispatch => {
    dispatch({
      type: apiProfileConstants.UPDATE_PROFILE_REQUEST,
    });
    return makeApiRequest('update_profile', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiProfileConstants.UPDATE_PROFILE_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiProfileConstants.UPDATE_PROFILE_FAILURE,
          payload: errors,
        })
      }
    )
  }
};
  
const getProfile = (options) => {
  return async dispatch => {
    dispatch({
      type: apiProfileConstants.GET_PROFILE_REQUEST,
    });
    return makeApiRequest('get_profile', 'get', options)
    .then(
      response => {
        dispatch({
          type: apiProfileConstants.GET_PROFILE_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiProfileConstants.GET_PROFILE_FAILURE,
          payload: errors,
        });
      }
    )
  };
};
  
const deactivateProfile = (options) => {
  return async dispatch => {
    dispatch({
      type: apiProfileConstants.DEACTIVATE_PROFILE_REQUEST,
    });
    return makeApiRequest('deactivate_profile', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiProfileConstants.DEACTIVATE_PROFILE_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiProfileConstants.DEACTIVATE_PROFILE_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

export const apiProfileActions = {
    createProfile, getProfile, updateProfile, deactivateProfile
};