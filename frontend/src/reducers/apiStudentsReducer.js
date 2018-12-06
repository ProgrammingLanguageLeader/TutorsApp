import Immutable from 'seamless-immutable';

import { apiStudentsConstants } from '../constants';

const initialState = Immutable({
  students: [],
  fetching: false,
  errors: null,
});

const apiStudentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiStudentsConstants.GET_STUDENTS_REQUEST:
    case apiStudentsConstants.DELETE_STUDENT_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiStudentsConstants.DELETE_STUDENT_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case apiStudentsConstants.GET_STUDENTS_SUCCESS:
      return state.merge({
        students: action.payload,
        errors: null,
      });

    case apiStudentsConstants.GET_STUDENTS_FAILURE:
    case apiStudentsConstants.DELETE_STUDENT_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiStudentsReducer;
