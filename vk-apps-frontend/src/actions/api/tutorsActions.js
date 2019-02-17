import { makeApiRequest } from 'vk-apps-frontend/services/api';
import { tutorsConstants } from 'vk-apps-frontend/constants/api';

const getStudentRequestsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.GET_STUDENT_REQUESTS_LIST_REQUEST,
    });
    return makeApiRequest('tutors/student_requests/', 'get', options)
      .then(
        response => {
          dispatch({
            type: tutorsConstants.GET_STUDENT_REQUESTS_LIST_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: tutorsConstants.GET_STUDENT_REQUESTS_LIST_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const createStudentRequest = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.CREATE_STUDENT_REQUEST_REQUEST,
    });
    return makeApiRequest('tutors/student_requests/', 'post', options)
      .then(
        response => {
          dispatch({
            type: tutorsConstants.CREATE_STUDENT_REQUEST_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: tutorsConstants.CREATE_STUDENT_REQUEST_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const getStudentRequest = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.GET_STUDENT_REQUEST_REQUEST,
    });
    return makeApiRequest(`tutors/student_requests/${id}/`, 'get', options)
      .then(
        response => {
          dispatch({
            type: tutorsConstants.GET_STUDENT_REQUEST_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: tutorsConstants.GET_STUDENT_REQUEST_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const deleteStudentRequest = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.DELETE_STUDENT_REQUEST_REQUEST,
    });
    return makeApiRequest(`tutors/student_requests/${id}/`, 'delete', options)
      .then(
        response => {
          dispatch({
            type: tutorsConstants.DELETE_STUDENT_REQUEST_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: tutorsConstants.DELETE_STUDENT_REQUEST_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const acceptStudentRequest = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.ACCEPT_STUDENT_REQUEST_REQUEST,
    });
    return makeApiRequest(`tutors/student_requests/${id}/accept/`, 'post', options)
      .then(
        response => {
          dispatch({
            type: tutorsConstants.ACCEPT_STUDENT_REQUEST_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: tutorsConstants.ACCEPT_STUDENT_REQUEST_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const getStudentsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.GET_STUDENTS_LIST_REQUEST,
    });
    return makeApiRequest('tutors/students/', 'get', options)
      .then(
        response => {
          dispatch({
            type: tutorsConstants.GET_STUDENTS_LIST_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: tutorsConstants.GET_STUDENTS_LIST_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const getStudent = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.GET_STUDENT_REQUEST,
    });
    return makeApiRequest(`tutors/students/${id}/`, 'get', options)
      .then(
        response => {
          dispatch({
            type: tutorsConstants.GET_STUDENT_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: tutorsConstants.GET_STUDENT_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const deleteStudent = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.DELETE_STUDENT_REQUEST,
    });
    return makeApiRequest(`tutors/students/${id}/`, 'delete', options)
      .then(
        response => {
          dispatch({
            type: tutorsConstants.DELETE_STUDENT_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: tutorsConstants.DELETE_STUDENT_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const getTutorsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.GET_TUTORS_LIST_REQUEST,
    });
    return makeApiRequest('tutors/tutors/', 'get', options)
      .then(
        response => {
          dispatch({
            type: tutorsConstants.GET_TUTORS_LIST_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: tutorsConstants.GET_TUTORS_LIST_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

export const tutorsActions = {
  getStudentRequestsList,
  createStudentRequest,
  getStudentRequest,
  acceptStudentRequest,
  deleteStudentRequest,
  getStudentsList,
  getStudent,
  deleteStudent,
  getTutorsList,
};