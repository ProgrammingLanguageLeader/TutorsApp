import { apiConstants } from '../constants/api';

const initialState = {
  response: null,
  fetching: false,
  errors: [],
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiConstants.API_REQUEST: {
      return {
        ...state,
        fetching: true,
        errors: [],
      };
    }
    case apiConstants.API_SUCCESS: {
      const response = action.payload;
      return {
        ...state,
        fetching: false,
        response,
      };
    }
    case apiConstants.API_FAILURE: {
      const errors = action.payload;
      return {
        ...state,
        fetching: false,
        response: null,
        errors,
      };
    }
    
    default: {
      return state;
    }
  }
};

export default apiReducer;