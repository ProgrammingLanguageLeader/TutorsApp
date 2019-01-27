import { filterConstants, educationLevelList } from 'constants';

const backendFieldsWithNulls = educationLevelList.reduce((object, level) => {
  return { ...object, [level.backendField]: null }
}, {});
const initialState = {
  subject: null,
  price_min: 0,
  price_max: 10000,
  city: null,
  district: null,
  metro_station: null,
  ...backendFieldsWithNulls,
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