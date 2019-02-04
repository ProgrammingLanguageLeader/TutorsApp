import { makeApiRequest } from 'vk-apps-frontend/services/api';
import { vacanciesConstants } from 'vk-apps-frontend/constants/api';

const searchVacancies = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: vacanciesConstants.SEARCH_VACANCIES_REQUEST
    });
    return makeApiRequest('vacancies/', 'get', options)
      .then(
        response => {
          dispatch({
            type: vacanciesConstants.SEARCH_VACANCIES_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: vacanciesConstants.SEARCH_VACANCIES_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const createVacancy = (options = {}) => {
  return async dispatch => {
    dispatch({
      type: vacanciesConstants.CREATE_VACANCY_REQUEST
    });
    return makeApiRequest('vacancies/', 'post', options)
      .then(
        response => {
          dispatch({
            type: vacanciesConstants.CREATE_VACANCY_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: vacanciesConstants.CREATE_VACANCY_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const getVacancy = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: vacanciesConstants.GET_VACANCY_REQUEST
    });
    return makeApiRequest(`vacancies/${id}/`, 'get', options)
      .then(
        response => {
          dispatch({
            type: vacanciesConstants.GET_VACANCY_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: vacanciesConstants.GET_VACANCY_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const updateVacancy = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: vacanciesConstants.UPDATE_VACANCY_REQUEST
    });
    return makeApiRequest(`vacancies/${id}/`, 'patch', options)
      .then(
        response => {
          dispatch({
            type: vacanciesConstants.UPDATE_VACANCY_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: vacanciesConstants.UPDATE_VACANCY_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const deleteVacancy = (id, options = {}) => {
  return async dispatch => {
    dispatch({
      type: vacanciesConstants.DELETE_VACANCY_REQUEST
    });
    return makeApiRequest(`vacancies/${id}/`, 'delete', options)
      .then(
        response => {
          dispatch({
            type: vacanciesConstants.DELETE_VACANCY_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: vacanciesConstants.DELETE_VACANCY_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

export const vacanciesActions = {
  searchVacancies, createVacancy, getVacancy, updateVacancy, deleteVacancy,
};
