import Immutable from 'seamless-immutable';

import { apiVacancyConstants } from '../constants';

const initialState = Immutable({
  vacancies: [],
  fetching: false,
  errors: null,
});

const apiVacanciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiVacancyConstants.SEARCH_VACANCIES_REQUEST:
    case apiVacancyConstants.GET_PROFILE_VACANCIES_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiVacancyConstants.SEARCH_VACANCIES_SUCCESS:
    case apiVacancyConstants.GET_PROFILE_VACANCIES_SUCCESS:
      return state.merge({
        vacancies: action.payload,
        fetching: false,
        errors: null,
      });

    case apiVacancyConstants.SEARCH_VACANCIES_FAILURE:
    case apiVacancyConstants.GET_PROFILE_VACANCIES_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiVacanciesReducer;
