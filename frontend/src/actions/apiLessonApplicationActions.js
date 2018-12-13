import { makeApiRequest } from "../services/api";
import { apiLessonApplicationConstants } from "../constants";

const createApplication = (options) => {
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

const getTutorApplications = (options) => {
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

const getStudentApplications = (options) => {
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

const acceptApplication = (options) => {
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

const rejectApplication = (options) => {
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
  createApplication, getTutorApplications, getStudentApplications,
  acceptApplication, rejectApplication
};
