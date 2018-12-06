import { filterConstants } from '../constants/filterConstants';

const initialState = {
  subject: null,
  price_min: 0,
  price_max: 10000,
  primary_school: null,
  secondary_school: null,
  olympiads: null,
  ege: null,
  oge: null,
  foreign_lang_cert: null,
  university: null,
  distance_learning: null,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case filterConstants.VACANCIES_FILTER_UPDATE: {
      const { params } = action;
      return {
        ...state,
        ...params,
      }
    }
    
    case filterConstants.VACANCIES_FILTER_DELETE: {
      return initialState;
    }

    default:
      return state;
  }
};

export default filterReducer;