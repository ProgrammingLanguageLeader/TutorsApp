import Immutable from 'seamless-immutable';

import { apiApplicationConstants } from '../constants';

const initialState = Immutable({
  tutorApplications: [],
  studentApplications: [],
  fetching: false,
  errors: null,
});

const apiApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiApplicationConstants.CREATE_APPLICATION_REQUEST:
    case apiApplicationConstants.GET_TUTOR_APPLICATIONS_REQUEST:
    case apiApplicationConstants.GET_STUDENT_APPLICATIONS_REQUEST:
    case apiApplicationConstants.ACCEPT_APPLICATION_REQUEST:
    case apiApplicationConstants.REJECT_APPLICATION_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiApplicationConstants.CREATE_APPLICATION_SUCCESS:
    case apiApplicationConstants.ACCEPT_APPLICATION_SUCCESS:
    case apiApplicationConstants.REJECT_APPLICATION_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case apiApplicationConstants.GET_TUTOR_APPLICATIONS_SUCCESS:
      return state.merge({
        tutorApplications: action.payload,
      });

    case apiApplicationConstants.GET_STUDENT_APPLICATIONS_SUCCESS:
      return state.merge({
        studentApplications: action.payload,
      });

    case apiApplicationConstants.CREATE_APPLICATION_FAILURE:
    case apiApplicationConstants.GET_TUTOR_APPLICATIONS_FAILURE:
    case apiApplicationConstants.GET_STUDENT_APPLICATIONS_FAILURE:
    case apiApplicationConstants.ACCEPT_APPLICATION_FAILURE:
    case apiApplicationConstants.REJECT_APPLICATION_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiApplicationReducer;
