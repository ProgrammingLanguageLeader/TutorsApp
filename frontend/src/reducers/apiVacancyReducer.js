import Immutable from 'seamless-immutable';

import { apiVacancyConstants } from '../constants';

const initialState = Immutable({
  vacancy: {},
  vacancies: [],
  fetching: false,
  errors: null,
});

const apiVacancyReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiVacancyConstants.CREATE_VACANCY_REQUEST:
    case apiVacancyConstants.UPDATE_VACANCY_REQUEST:
    case apiVacancyConstants.SEARCH_VACANCIES_REQUEST:
    case apiVacancyConstants.GET_VACANCY_REQUEST:
    case apiVacancyConstants.GET_PROFILE_VACANCIES_REQUEST:
    case apiVacancyConstants.DEACTIVATE_VACANCY_REQUEST:
    case apiVacancyConstants.DELETE_VACANCY_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiVacancyConstants.CREATE_VACANCY_SUCCESS:
    case apiVacancyConstants.UPDATE_VACANCY_SUCCESS:
    case apiVacancyConstants.DEACTIVATE_VACANCY_SUCCESS:
    case apiVacancyConstants.DELETE_VACANCY_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case apiVacancyConstants.SEARCH_VACANCIES_SUCCESS:
    case apiVacancyConstants.GET_PROFILE_VACANCIES_SUCCESS:
      return state.merge({
        vacancies: action.payload,
        fetching: false,
        errors: null,
      });

    case apiVacancyConstants.GET_VACANCY_SUCCESS:
      return state.merge({
        vacancy: action.payload,
        errors: null,
      });

    case apiVacancyConstants.CREATE_VACANCY_FAILURE:
    case apiVacancyConstants.UPDATE_VACANCY_FAILURE:
    case apiVacancyConstants.SEARCH_VACANCIES_FAILURE:
    case apiVacancyConstants.GET_VACANCY_FAILURE:
    case apiVacancyConstants.GET_PROFILE_VACANCIES_FAILURE:
    case apiVacancyConstants.DEACTIVATE_VACANCY_FAILURE:
    case apiVacancyConstants.DELETE_VACANCY_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiVacancyReducer;
