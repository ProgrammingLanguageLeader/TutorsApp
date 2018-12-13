import { makeApiRequest } from "../services/api";
import { apiStudentApplicationConstants } from "../constants";

const createStudentApplication = (options) => {
  return async dispatch => {
    dispatch({
      type: apiStudentApplicationConstants.CREATE_STUDENT_APPLICATION_REQUEST
    });
    return makeApiRequest('create_student_application', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiStudentApplicationConstants.CREATE_STUDENT_APPLICATION_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiStudentApplicationConstants.CREATE_STUDENT_APPLICATION_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const getIncomingStudentApplications = (options) => {
  return async dispatch => {
    dispatch({
      type: apiStudentApplicationConstants.GET_INCOMING_STUDENT_APPLICATIONS_REQUEST
    });
    return makeApiRequest('get_incoming_student_applications', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiStudentApplicationConstants.GET_INCOMING_STUDENT_APPLICATIONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiStudentApplicationConstants.GET_INCOMING_STUDENT_APPLICATIONS_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const getOutgoingStudentApplications = (options) => {
  return async dispatch => {
    dispatch({
      type: apiStudentApplicationConstants.GET_OUTGOING_STUDENT_APPLICATIONS_REQUEST
    });
    return makeApiRequest('get_outgoing_student_applications', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiStudentApplicationConstants.GET_OUTGOING_STUDENT_APPLICATIONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiStudentApplicationConstants.GET_OUTGOING_STUDENT_APPLICATIONS_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const acceptStudentApplication = (options) => {
  return async dispatch => {
    dispatch({
      type: apiStudentApplicationConstants.ACCEPT_STUDENT_APPLICATION_REQUEST
    });
    return makeApiRequest('accept_student_application', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiStudentApplicationConstants.ACCEPT_STUDENT_APPLICATION_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiStudentApplicationConstants.ACCEPT_STUDENT_APPLICATION_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const rejectStudentApplication = (options) => {
  return async dispatch => {
    dispatch({
      type: apiStudentApplicationConstants.REJECT_STUDENT_APPLICATION_REQUEST
    });
    return makeApiRequest('reject_student_application', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiStudentApplicationConstants.REJECT_STUDENT_APPLICATION_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiStudentApplicationConstants.REJECT_STUDENT_APPLICATION_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

export const apiStudentApplicationActions = {
  createApplication: createStudentApplication,
  getIncomingApplications: getIncomingStudentApplications,
  getOutgoingApplications: getOutgoingStudentApplications,
  acceptApplication: acceptStudentApplication,
  rejectApplication: rejectStudentApplication
};
