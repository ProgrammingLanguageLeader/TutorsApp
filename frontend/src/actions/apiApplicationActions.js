import { makeApiRequest } from "../services/api";
import { apiApplicationConstants } from "../constants";

const createApplication = (options) => {
  return async dispatch => {
    dispatch({
      type: apiApplicationConstants.CREATE_APPLICATION_REQUEST
    });
    return makeApiRequest('create_application', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiApplicationConstants.CREATE_APPLICATION_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiApplicationConstants.CREATE_APPLICATION_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const getTutorApplications = (options) => {
  return async dispatch => {
    dispatch({
      type: apiApplicationConstants.GET_TUTOR_APPLICATIONS_REQUEST
    });
    return makeApiRequest('get_tutor_applications', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiApplicationConstants.GET_TUTOR_APPLICATIONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiApplicationConstants.GET_TUTOR_APPLICATIONS_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const getStudentApplications = (options) => {
  return async dispatch => {
    dispatch({
      type: apiApplicationConstants.GET_STUDENT_APPLICATIONS_REQUEST
    });
    return makeApiRequest('get_student_applications', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiApplicationConstants.GET_STUDENT_APPLICATIONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiApplicationConstants.GET_STUDENT_APPLICATIONS_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const acceptApplication = (options) => {
  return async dispatch => {
    dispatch({
      type: apiApplicationConstants.ACCEPT_APPLICATION_REQUEST
    });
    return makeApiRequest('accept_application', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiApplicationConstants.ACCEPT_APPLICATION_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiApplicationConstants.ACCEPT_APPLICATION_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const rejectApplication = (options) => {
  return async dispatch => {
    dispatch({
      type: apiApplicationConstants.REJECT_APPLICATION_REQUEST
    });
    return makeApiRequest('reject_application', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiApplicationConstants.REJECT_APPLICATION_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiApplicationConstants.REJECT_APPLICATION_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

export const apiApplicationActions = {
  createApplication, getTutorApplications, getStudentApplications,
  acceptApplication, rejectApplication
};
