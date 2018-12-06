import { makeApiRequest } from '../services/api';
import { apiVacancyConstants } from "../constants";

const createVacancy = (options) => {
  return async dispatch => {
    dispatch({
      type: apiVacancyConstants.CREATE_VACANCY_REQUEST
    });
    return makeApiRequest('create_vacancy', 'post', options)
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

const updateVacancy = (options) => {
  return async dispatch => {
    dispatch({
      type: apiVacancyConstants.UPDATE_VACANCY_REQUEST
    });
    return makeApiRequest('update_vacancy', 'post', options)
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

const searchVacancies = (options) => {
  return async dispatch => {
    dispatch({
      type: apiVacancyConstants.SEARCH_VACANCIES_REQUEST
    });
    return makeApiRequest('search_vacancies', 'get', options)
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

const getVacancy = (options) => {
  return async dispatch => {
    dispatch({
      type: apiVacancyConstants.GET_VACANCY_REQUEST
    });
    return makeApiRequest('get_vacancy', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiVacancyConstants.GET_VACANCY_REQUEST,
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

const getProfileVacancies = (options) => {
  return async dispatch => {
    dispatch({
      type: apiVacancyConstants.GET_PROFILE_VACANCIES_REQUEST
    });
    return makeApiRequest('get_profile_vacancies', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiVacancyConstants.GET_PROFILE_VACANCIES_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiVacancyConstants.GET_PROFILE_VACANCIES_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const deactivateVacancy = (options) => {
  return async dispatch => {
    dispatch({
      type: apiVacancyConstants.DEACTIVATE_VACANCY_REQUEST
    });
    return makeApiRequest('deactivate_vacancy', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiVacancyConstants.DEACTIVATE_VACANCY_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiVacancyConstants.DEACTIVATE_VACANCY_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const deleteVacancy = (options) => {
  return async dispatch => {
    dispatch({
      type: apiVacancyConstants.DELETE_VACANCY_REQUEST
    });
    return makeApiRequest('delete_vacancy', 'post', options)
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
  createVacancy, updateVacancy, searchVacancies,
  getVacancy, getProfileVacancies, deactivateVacancy,
  deleteVacancy,
};
