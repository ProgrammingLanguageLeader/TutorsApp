import { vacanciesFilterConstants } from 'vk-apps-frontend/constants';

const updateFilter = (params) => (dispatch) => {
  return dispatch({
    type: vacanciesFilterConstants.VACANCIES_FILTER_UPDATE,
    params,
  })
};

const deleteFilter = () => dispatch => {
  return dispatch({
    type: vacanciesFilterConstants.VACANCIES_FILTER_DELETE
  });
};

export const vacanciesFilterActions = {
  updateFilter, deleteFilter, 
};