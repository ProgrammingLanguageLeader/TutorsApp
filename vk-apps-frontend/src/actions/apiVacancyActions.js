import { makeApiRequest } from '../services/api';
import { apiVacancyConstants } from "../constants";

const searchVacancies = (options) => {
  return async dispatch => {
    dispatch({
      type: apiVacancyConstants.SEARCH_VACANCIES_REQUEST
    });
    return makeApiRequest('vacancies/', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiVacancyConstants.SEARCH_VACANCIES_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiVacancyConstants.SEARCH_VACANCIES_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const createVacancy = (options) => {
  return async dispatch => {
    dispatch({
      type: apiVacancyConstants.CREATE_VACANCY_REQUEST
    });
    return makeApiRequest('vacancies/', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiVacancyConstants.CREATE_VACANCY_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiVacancyConstants.CREATE_VACANCY_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const getVacancy = (id, options) => {
  return async dispatch => {
    dispatch({
      type: apiVacancyConstants.GET_VACANCY_REQUEST
    });
    return makeApiRequest(`vacancies/${id}/`, 'get', options)
      .then(
        response => {
          dispatch({
            type: apiVacancyConstants.GET_VACANCY_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiVacancyConstants.GET_VACANCY_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const updateVacancy = (id, options) => {
  return async dispatch => {
    dispatch({
      type: apiVacancyConstants.UPDATE_VACANCY_REQUEST
    });
    return makeApiRequest(`vacancies/${id}/`, 'patch', options)
      .then(
        response => {
          dispatch({
            type: apiVacancyConstants.UPDATE_VACANCY_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiVacancyConstants.UPDATE_VACANCY_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const deleteVacancy = (id, options) => {
  return async dispatch => {
    dispatch({
      type: apiVacancyConstants.DELETE_VACANCY_REQUEST
    });
    return makeApiRequest(`vacancies/${id}/`, 'delete', options)
      .then(
        response => {
          dispatch({
            type: apiVacancyConstants.DELETE_VACANCY_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiVacancyConstants.DELETE_VACANCY_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

export const apiVacancyActions = {
  searchVacancies, createVacancy, getVacancy, updateVacancy, deleteVacancy,
};
