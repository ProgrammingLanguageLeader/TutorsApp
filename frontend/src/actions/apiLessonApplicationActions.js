import { makeApiRequest } from "../services/api";
import { apiLessonApplicationConstants } from "../constants";

const createLessonApplication = (options) => {
  return async dispatch => {
    dispatch({
      type: apiLessonApplicationConstants.CREATE_LESSON_APPLICATION_REQUEST
    });
    return makeApiRequest('create_lesson_application', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiLessonApplicationConstants.CREATE_LESSON_APPLICATION_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiLessonApplicationConstants.CREATE_LESSON_APPLICATION_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const getIncomingLessonApplications = (options) => {
  return async dispatch => {
    dispatch({
      type: apiLessonApplicationConstants.GET_INCOMING_LESSON_APPLICATIONS_REQUEST
    });
    return makeApiRequest('get_incoming_lesson_applications', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiLessonApplicationConstants.GET_INCOMING_LESSON_APPLICATIONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiLessonApplicationConstants.GET_INCOMING_LESSON_APPLICATIONS_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const getOutgoingLessonApplications = (options) => {
  return async dispatch => {
    dispatch({
      type: apiLessonApplicationConstants.GET_OUTGOING_LESSON_APPLICATIONS_REQUEST
    });
    return makeApiRequest('get_outgoing_lesson_applications', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiLessonApplicationConstants.GET_OUTGOING_LESSON_APPLICATIONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiLessonApplicationConstants.GET_OUTGOING_LESSON_APPLICATIONS_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const acceptLessonApplication = (options) => {
  return async dispatch => {
    dispatch({
      type: apiLessonApplicationConstants.ACCEPT_LESSON_APPLICATION_REQUEST
    });
    return makeApiRequest('accept_lesson_application', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiLessonApplicationConstants.ACCEPT_LESSON_APPLICATION_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiLessonApplicationConstants.ACCEPT_LESSON_APPLICATION_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const rejectLessonApplication = (options) => {
  return async dispatch => {
    dispatch({
      type: apiLessonApplicationConstants.REJECT_LESSON_APPLICATION_REQUEST
    });
    return makeApiRequest('reject_lesson_application', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiLessonApplicationConstants.REJECT_LESSON_APPLICATION_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiLessonApplicationConstants.REJECT_LESSON_APPLICATION_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

export const apiLessonApplicationActions = {
  createApplication: createLessonApplication,
  getIncomingApplications: getIncomingLessonApplications,
  getOutgoingApplications: getOutgoingLessonApplications,
  acceptApplication: acceptLessonApplication,
  rejectApplication: rejectLessonApplication
};
