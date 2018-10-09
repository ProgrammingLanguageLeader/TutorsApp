import { filterConstants } from '../constants/filter';

const initialState = {
  subject: '',
  price_min: 0,
  price_max: 1500,
  primary_school: false,
  secondary_school: false,
  olympiads: false,
  ege: false,
  oge: false,
  university: false,
  foreign_lang_cert: false,
  university: false,
  distance_learning: false,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case filterConstants.VACANCIES_FILTER_UPDATE: {
      return {
        ...state,
        ...action.params,
      };
    }
    
    case filterConstants.VACANCIES_FILTER_DELETE: {
      return initialState;
    }

    default:
      return state;
  }
};

export default filterReducer;