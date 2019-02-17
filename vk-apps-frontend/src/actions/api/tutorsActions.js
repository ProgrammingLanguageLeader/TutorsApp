import APIRequestManager from 'vk-apps-frontend/services/APIRequestManager';
import handleAPIResponse from 'vk-apps-frontend/helpers/handleAPIResponse';
import { tutorsConstants } from 'vk-apps-frontend/constants/api';

const requestManager = APIRequestManager.getInstance();

const getStudentRequestsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.GET_STUDENT_REQUESTS_LIST_REQUEST,
    });
    return requestManager.makeRequest('tutors/student_requests/', 'get', options)
      .then(handleAPIResponse(
        tutorsConstants.GET_STUDENT_REQUESTS_LIST_SUCCESS,
        tutorsConstants.GET_STUDENT_REQUESTS_LIST_SUCCESS,
        dispatch
      ))
  };
};

const createStudentRequest = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.CREATE_STUDENT_REQUEST_REQUEST,
    });
    return requestManager.makeRequest('tutors/student_requests/', 'post', options)
      .then(handleAPIResponse(
        tutorsConstants.CREATE_STUDENT_REQUEST_SUCCESS,
        tutorsConstants.CREATE_STUDENT_REQUEST_FAILURE,
        dispatch
      ))
  };
};

const getStudentRequest = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.GET_STUDENT_REQUEST_REQUEST,
    });
    return requestManager.makeRequest(`tutors/student_requests/${id}/`, 'get', options)
      .then(handleAPIResponse(
        tutorsConstants.GET_STUDENT_REQUEST_SUCCESS,
        tutorsConstants.GET_STUDENT_REQUEST_FAILURE,
        dispatch
      ))
  };
};

const deleteStudentRequest = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.DELETE_STUDENT_REQUEST_REQUEST,
    });
    return requestManager.makeRequest(`tutors/student_requests/${id}/`, 'delete', options)
      .then(handleAPIResponse(
        tutorsConstants.DELETE_STUDENT_REQUEST_SUCCESS,
        tutorsConstants.DELETE_STUDENT_REQUEST_FAILURE,
        dispatch
      ))
  };
};

const acceptStudentRequest = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.ACCEPT_STUDENT_REQUEST_REQUEST,
    });
    return requestManager.makeRequest(`tutors/student_requests/${id}/accept/`, 'post', options)
      .then(handleAPIResponse(
        tutorsConstants.ACCEPT_STUDENT_REQUEST_SUCCESS,
        tutorsConstants.ACCEPT_STUDENT_REQUEST_FAILURE,
        dispatch
      ))
  };
};

const getStudentsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.GET_STUDENTS_LIST_REQUEST,
    });
    return requestManager.makeRequest('tutors/students/', 'get', options)
      .then(handleAPIResponse(
        tutorsConstants.GET_STUDENTS_LIST_SUCCESS,
        tutorsConstants.GET_STUDENTS_LIST_FAILURE,
        dispatch
      ))
  };
};

const getStudent = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.GET_STUDENT_REQUEST,
    });
    return requestManager.makeRequest(`tutors/students/${id}/`, 'get', options)
      .then(handleAPIResponse(
        tutorsConstants.GET_STUDENT_SUCCESS,
        tutorsConstants.GET_STUDENT_FAILURE,
        dispatch
      ))
  };
};

const deleteStudent = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.DELETE_STUDENT_REQUEST,
    });
    return requestManager.makeRequest(`tutors/students/${id}/`, 'delete', options)
      .then(handleAPIResponse(
        tutorsConstants.DELETE_STUDENT_SUCCESS,
        tutorsConstants.DELETE_STUDENT_FAILURE,
        dispatch
      ))
  };
};

const getTutorsList = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: tutorsConstants.GET_TUTORS_LIST_REQUEST,
    });
    return requestManager.makeRequest('tutors/tutors/', 'get', options)
      .then(handleAPIResponse(
        tutorsConstants.GET_TUTORS_LIST_SUCCESS,
        tutorsConstants.GET_TUTORS_LIST_FAILURE,
        dispatch
      ))
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