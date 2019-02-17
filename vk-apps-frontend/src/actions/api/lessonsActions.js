import { makeApiRequest } from 'vk-apps-frontend/services/api';
import { lessonsConstants } from 'vk-apps-frontend/constants/api';

const getLessonsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.GET_LESSONS_LIST_REQUEST,
    });
    return makeApiRequest('lessons/', 'get', options)
      .then(
        response => {
          dispatch({
            type: lessonsConstants.GET_LESSONS_LIST_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: lessonsConstants.GET_LESSONS_LIST_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const createLesson = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.CREATE_LESSON_REQUEST,
    });
    return makeApiRequest('lessons/', 'post', options)
      .then(
        response => {
          dispatch({
            type: lessonsConstants.CREATE_LESSON_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: lessonsConstants.CREATE_LESSON_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const getLesson = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.GET_LESSON_REQUEST,
    });
    return makeApiRequest(`lessons/${id}/`, 'get', options)
      .then(
        response => {
          dispatch({
            type: lessonsConstants.GET_LESSON_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: lessonsConstants.GET_LESSON_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const updateLesson = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.UPDATE_LESSON_REQUEST,
    });
    return makeApiRequest(`lessons/${id}/`, 'patch', options)
      .then(
        response => {
          dispatch({
            type: lessonsConstants.UPDATE_LESSON_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: lessonsConstants.UPDATE_LESSON_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

const deleteLesson = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.DELETE_LESSON_REQUEST,
    });
    return makeApiRequest(`lessons/${id}/`, 'delete', options)
      .then(
        response => {
          dispatch({
            type: lessonsConstants.DELETE_LESSON_SUCCESS,
            payload: response,
          });
          return response;
        },
        errors => {
          dispatch({
            type: lessonsConstants.DELETE_LESSON_FAILURE,
            payload: errors,
          });
          return errors;
        }
      )
  };
};

export const lessonsActions = {
  getLessonsList,
  createLesson,
  getLesson,
  updateLesson,
  deleteLesson,
};
