import Immutable from 'seamless-immutable';

import { apiLessonApplicationConstants } from '../constants';

const initialState = Immutable({
  tutorApplications: [],
  studentApplications: [],
  fetching: false,
  errors: null,
});

const apiApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiLessonApplicationConstants.CREATE_APPLICATION_REQUEST:
    case apiLessonApplicationConstants.GET_TUTOR_APPLICATIONS_REQUEST:
    case apiLessonApplicationConstants.GET_STUDENT_APPLICATIONS_REQUEST:
    case apiLessonApplicationConstants.ACCEPT_APPLICATION_REQUEST:
    case apiLessonApplicationConstants.REJECT_APPLICATION_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiLessonApplicationConstants.CREATE_APPLICATION_SUCCESS:
    case apiLessonApplicationConstants.ACCEPT_APPLICATION_SUCCESS:
    case apiLessonApplicationConstants.REJECT_APPLICATION_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case apiLessonApplicationConstants.GET_TUTOR_APPLICATIONS_SUCCESS:
      return state.merge({
        tutorApplications: action.payload,
        fetching: false,
        errors: null,
      });

    case apiLessonApplicationConstants.GET_STUDENT_APPLICATIONS_SUCCESS:
      return state.merge({
        studentApplications: action.payload,
        fetching: false,
        errors: null,
      });

    case apiLessonApplicationConstants.CREATE_APPLICATION_FAILURE:
    case apiLessonApplicationConstants.GET_TUTOR_APPLICATIONS_FAILURE:
    case apiLessonApplicationConstants.GET_STUDENT_APPLICATIONS_FAILURE:
    case apiLessonApplicationConstants.ACCEPT_APPLICATION_FAILURE:
    case apiLessonApplicationConstants.REJECT_APPLICATION_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiApplicationReducer;
