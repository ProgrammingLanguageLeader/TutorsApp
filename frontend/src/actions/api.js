import { makeApiRequest } from '../services/api';
import { apiConstants } from '../constants/api';

const makeRequest = (endpoint, method, options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.API_REQUEST
    });
    makeApiRequest(endpoint, method, options)
    .then(
      response => {
        dispatch({
          type: apiConstants.API_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.API_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

export const apiActions = {
  makeRequest,
};