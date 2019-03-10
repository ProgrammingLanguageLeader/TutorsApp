import Immutable from 'seamless-immutable';

import { vacanciesFilterConstants, educationLevelList } from 'vk-apps-frontend/constants';

const initialEducationLevels = educationLevelList.reduce((object, level) => {
  return {
    ...object,
    [level.backendField]: null
  }
}, {});

const initialState = Immutable({
  subject: '',
  price__gte: 0,
  price__lte: 10000,
  city: '',
  district: '',
  metro_station: '',
  home_schooling: null,
  ...initialEducationLevels,
});

const vacanciesFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case vacanciesFilterConstants.VACANCIES_FILTER_UPDATE: {
      const { params } = action;
      return Immutable.merge({
        ...state,
        ...params,
      });
    }
    
    case vacanciesFilterConstants.VACANCIES_FILTER_DELETE: {
      return Immutable.merge({
        ...initialState,
      });
    }

    default:
      return state;
  }
};

export default vacanciesFilterReducer;