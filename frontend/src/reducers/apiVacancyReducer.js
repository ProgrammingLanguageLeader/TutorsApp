import Immutable from 'seamless-immutable';

import { apiVacancyConstants } from '../constants';

const initialState = Immutable({
  vacancy: {},
  fetching: false,
  errors: null,
});

const apiVacancyReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiVacancyConstants.CREATE_VACANCY_REQUEST:
    case apiVacancyConstants.UPDATE_VACANCY_REQUEST:
    case apiVacancyConstants.GET_VACANCY_REQUEST:
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

    case apiVacancyConstants.GET_VACANCY_SUCCESS:
      return state.merge({
        vacancy: action.payload,
        fetching: false,
        errors: null,
      });

    case apiVacancyConstants.CREATE_VACANCY_FAILURE:
    case apiVacancyConstants.UPDATE_VACANCY_FAILURE:
    case apiVacancyConstants.GET_VACANCY_FAILURE:
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
