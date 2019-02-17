import APIRequestManager from 'vk-apps-frontend/services/APIRequestManager';
import handleAPIResponse from 'vk-apps-frontend/helpers/handleAPIResponse';
import { vacanciesConstants } from 'vk-apps-frontend/constants/api';

const requestManager = APIRequestManager.getInstance();

const searchVacancies = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: vacanciesConstants.SEARCH_VACANCIES_REQUEST
    });
    return requestManager.makeRequest('vacancies/', 'get', options)
      .then(handleAPIResponse(
        vacanciesConstants.SEARCH_VACANCIES_SUCCESS,
        vacanciesConstants.SEARCH_VACANCIES_FAILURE,
        dispatch
      ))
  }
};

const createVacancy = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: vacanciesConstants.CREATE_VACANCY_REQUEST
    });
    return requestManager.makeRequest('vacancies/', 'post', options)
      .then(handleAPIResponse(
        vacanciesConstants.CREATE_VACANCY_SUCCESS,
        vacanciesConstants.CREATE_VACANCY_FAILURE,
        dispatch
      ))
  }
};

const getVacancy = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: vacanciesConstants.GET_VACANCY_REQUEST
    });
    return requestManager.makeRequest(`vacancies/${id}/`, 'get', options)
      .then(handleAPIResponse(
        vacanciesConstants.GET_VACANCY_SUCCESS,
        vacanciesConstants.GET_VACANCY_FAILURE,
        dispatch
      ))
  }
};

const updateVacancy = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: vacanciesConstants.UPDATE_VACANCY_REQUEST
    });
    return requestManager.makeRequest(`vacancies/${id}/`, 'patch', options)
      .then(handleAPIResponse(
        vacanciesConstants.UPDATE_VACANCY_SUCCESS,
        vacanciesConstants.UPDATE_VACANCY_FAILURE,
        dispatch
      ))
  }
};

const deleteVacancy = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: vacanciesConstants.DELETE_VACANCY_REQUEST
    });
    return requestManager.makeRequest(`vacancies/${id}/`, 'delete', options)
      .then(handleAPIResponse(
        vacanciesConstants.DELETE_VACANCY_SUCCESS,
        vacanciesConstants.DELETE_VACANCY_FAILURE,
        dispatch
      ))
  }
};

export const vacanciesActions = {
  searchVacancies,
  createVacancy,
  getVacancy,
  updateVacancy,
  deleteVacancy,
};