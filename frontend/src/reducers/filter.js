import { filterConstants } from '../constants/filter';

const initialState = {
  subject: null,
  price_min: null,
  price_max: null,
  experience: null,
  ege: null,
  oge: null,
  foreign_lang_cert: null,
  school: null,
  university: null,
  distance_learning: null,
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