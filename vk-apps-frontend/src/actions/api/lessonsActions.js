import APIRequestManager from 'vk-apps-frontend/services/APIRequestManager';
import handleAPIResponse from 'vk-apps-frontend/helpers/handleAPIResponse';
import { lessonsConstants } from 'vk-apps-frontend/constants/api';

const requestManager = APIRequestManager.getInstance();

const getLessonsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.GET_LESSONS_LIST_REQUEST,
    });
    return requestManager.makeRequest('lessons/', 'get', options)
      .then(handleAPIResponse(
        lessonsConstants.GET_LESSONS_LIST_SUCCESS,
        lessonsConstants.GET_LESSONS_LIST_FAILURE,
        dispatch
      ))
  };
};

const createLesson = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.CREATE_LESSON_REQUEST,
    });
    return requestManager.makeRequest('lessons/', 'post', options)
      .then(handleAPIResponse(
        lessonsConstants.CREATE_LESSON_SUCCESS,
        lessonsConstants.CREATE_LESSON_FAILURE,
        dispatch
      ))
  };
};

const getLesson = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.GET_LESSON_REQUEST,
    });
    return requestManager.makeRequest(`lessons/${id}/`, 'get', options)
      .then(handleAPIResponse(
        lessonsConstants.GET_LESSON_SUCCESS,
        lessonsConstants.GET_LESSON_FAILURE,
        dispatch
      ))
  };
};

const updateLesson = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.UPDATE_LESSON_REQUEST,
    });
    return requestManager.makeRequest(`lessons/${id}/`, 'patch', options)
      .then(handleAPIResponse(
        lessonsConstants.UPDATE_LESSON_SUCCESS,
        lessonsConstants.UPDATE_LESSON_FAILURE,
        dispatch
      ))
  };
};

const deleteLesson = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: lessonsConstants.DELETE_LESSON_REQUEST,
    });
    return requestManager.makeRequest(`lessons/${id}/`, 'delete', options)
      .then(handleAPIResponse(
        lessonsConstants.DELETE_LESSON_SUCCESS,
        lessonsConstants.DELETE_LESSON_FAILURE,
        dispatch
      ))
  };
};

export const lessonsActions = {
  getLessonsList,
  createLesson,
  getLesson,
  updateLesson,
  deleteLesson,
};