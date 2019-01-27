import Immutable from 'seamless-immutable';

import { vacanciesConstants } from 'constants/api';

const initialState = Immutable({
  vacancies: [],
  vacancy: {},
  fetching: false,
  errors: null,
});

const vacancyReducer = (state = initialState, action) => {
  switch (action.type) {
    case vacanciesConstants.CREATE_VACANCY_REQUEST:
    case vacanciesConstants.UPDATE_VACANCY_REQUEST:
    case vacanciesConstants.GET_VACANCY_REQUEST:
    case vacanciesConstants.DELETE_VACANCY_REQUEST:
      return state.merge({
        fetching: true,
      });

    case vacanciesConstants.CREATE_VACANCY_SUCCESS:
    case vacanciesConstants.UPDATE_VACANCY_SUCCESS:
    case vacanciesConstants.DELETE_VACANCY_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case vacanciesConstants.GET_VACANCY_SUCCESS:
      return state.merge({
        vacancy: action.payload,
        fetching: false,
        errors: null,
      });

    case vacanciesConstants.CREATE_VACANCY_FAILURE:
    case vacanciesConstants.UPDATE_VACANCY_FAILURE:
    case vacanciesConstants.GET_VACANCY_FAILURE:
    case vacanciesConstants.DELETE_VACANCY_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    case vacanciesConstants.SEARCH_VACANCIES_REQUEST:
      return state.merge({
        fetching: true,
      });

    case vacanciesConstants.SEARCH_VACANCIES_SUCCESS:
      return state.merge({
        vacancies: action.payload,
        fetching: false,
        errors: null,
      });

    case vacanciesConstants.SEARCH_VACANCIES_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default vacancyReducer;
