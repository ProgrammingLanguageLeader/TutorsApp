import Immutable from 'seamless-immutable';

import { apiLessonApplicationConstants } from '../constants';

const initialState = Immutable({
  incomingLessonApplications: [],
  outgoingLessonApplications: [],
  fetching: false,
  errors: null,
});

const apiLessonApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiLessonApplicationConstants.CREATE_LESSON_APPLICATION_REQUEST:
    case apiLessonApplicationConstants.GET_INCOMING_LESSON_APPLICATIONS_REQUEST:
    case apiLessonApplicationConstants.GET_OUTGOING_LESSON_APPLICATIONS_REQUEST:
    case apiLessonApplicationConstants.ACCEPT_LESSON_APPLICATION_REQUEST:
    case apiLessonApplicationConstants.REJECT_LESSON_APPLICATION_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiLessonApplicationConstants.CREATE_LESSON_APPLICATION_SUCCESS:
    case apiLessonApplicationConstants.ACCEPT_LESSON_APPLICATION_SUCCESS:
    case apiLessonApplicationConstants.REJECT_LESSON_APPLICATION_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case apiLessonApplicationConstants.GET_INCOMING_LESSON_APPLICATIONS_SUCCESS:
      return state.merge({
        incomingLessonApplications: action.payload,
        fetching: false,
        errors: null,
      });

    case apiLessonApplicationConstants.GET_OUTGOING_LESSON_APPLICATIONS_SUCCESS:
      return state.merge({
        outgoingLessonApplications: action.payload,
        fetching: false,
        errors: null,
      });

    case apiLessonApplicationConstants.CREATE_LESSON_APPLICATION_FAILURE:
    case apiLessonApplicationConstants.GET_INCOMING_LESSON_APPLICATIONS_FAILURE:
    case apiLessonApplicationConstants.GET_OUTGOING_LESSON_APPLICATIONS_FAILURE:
    case apiLessonApplicationConstants.ACCEPT_LESSON_APPLICATION_FAILURE:
    case apiLessonApplicationConstants.REJECT_LESSON_APPLICATION_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiLessonApplicationReducer;
