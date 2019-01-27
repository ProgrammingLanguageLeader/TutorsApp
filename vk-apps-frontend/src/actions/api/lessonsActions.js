import { makeApiRequest } from 'services/api';
import { lessonsConstants } from 'constants';

const createLesson = (options) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.CREATE_LESSON_REQUEST,
    });
    return makeApiRequest('create_lesson', 'post', options)
      .then(
        response => {
          dispatch({
            type: lessonsConstants.CREATE_LESSON_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: lessonsConstants.CREATE_LESSON_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const getLessons = (options) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.GET_LESSONS_REQUEST,
    });
    return makeApiRequest('get_lessons', 'get', options)
      .then(
        response => {
          dispatch({
            type: lessonsConstants.GET_LESSONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: lessonsConstants.GET_LESSONS_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const updateLesson = (options) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.UPDATE_LESSONS_REQUEST,
    });
    return makeApiRequest('update_lesson', 'post', options)
      .then(
        response => {
          dispatch({
            type: lessonsConstants.UPDATE_LESSONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: lessonsConstants.UPDATE_LESSONS_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const deleteLesson = (options) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.DELETE_LESSON_REQUEST,
    });
    return makeApiRequest('delete_lesson', 'post', options)
      .then(
        response => {
          dispatch({
            type: lessonsConstants.DELETE_LESSON_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: lessonsConstants.DELETE_LESSON_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

export const lessonsActions = {
  createLesson, getLessons, updateLesson, deleteLesson,
};
