import { filterConstants } from '../constants/filter';

const updateFilter = (params) => (dispatch) => {
  return dispatch({
    type: filterConstants.VACANCIES_FILTER_UPDATE,
    params,
  })
};

const deleteFilter = () => dispatch => {
  return dispatch({
    type: filterConstants.VACANCIES_FILTER_DELETE
  });
};

export const filterActions = {
  updateFilter, deleteFilter, 
};