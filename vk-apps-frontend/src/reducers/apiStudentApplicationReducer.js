import Immutable from 'seamless-immutable';

import { apiStudentApplicationConstants } from '../constants';

const initialState = Immutable({
  incomingStudentApplications: [],
  outgoingStudentApplications: [],
  fetching: false,
  errors: null,
});

const apiStudentApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiStudentApplicationConstants.CREATE_STUDENT_APPLICATION_REQUEST:
    case apiStudentApplicationConstants.GET_INCOMING_STUDENT_APPLICATIONS_REQUEST:
    case apiStudentApplicationConstants.GET_OUTGOING_STUDENT_APPLICATIONS_REQUEST:
    case apiStudentApplicationConstants.ACCEPT_STUDENT_APPLICATION_REQUEST:
    case apiStudentApplicationConstants.REJECT_STUDENT_APPLICATION_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiStudentApplicationConstants.CREATE_STUDENT_APPLICATION_SUCCESS:
    case apiStudentApplicationConstants.ACCEPT_STUDENT_APPLICATION_SUCCESS:
    case apiStudentApplicationConstants.REJECT_STUDENT_APPLICATION_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case apiStudentApplicationConstants.GET_INCOMING_STUDENT_APPLICATIONS_SUCCESS:
      return state.merge({
        incomingStudentApplications: action.payload,
        fetching: false,
        errors: null,
      });

    case apiStudentApplicationConstants.GET_OUTGOING_STUDENT_APPLICATIONS_SUCCESS:
      return state.merge({
        outgoingStudentApplications: action.payload,
        fetching: false,
        errors: null,
      });

    case apiStudentApplicationConstants.CREATE_STUDENT_APPLICATION_FAILURE:
    case apiStudentApplicationConstants.GET_INCOMING_STUDENT_APPLICATIONS_FAILURE:
    case apiStudentApplicationConstants.GET_OUTGOING_STUDENT_APPLICATIONS_FAILURE:
    case apiStudentApplicationConstants.ACCEPT_STUDENT_APPLICATION_FAILURE:
    case apiStudentApplicationConstants.REJECT_STUDENT_APPLICATION_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiStudentApplicationReducer;
