import Immutable from 'seamless-immutable';

import { tutorsConstants } from 'constants/api';

const initialState = Immutable({
  studentRequest: {},
  studentRequests: [],
  studentRequestsCount: 0,
  studentRequestsNext: null,
  studentRequestsPrevious: null,

  student: {},
  students: [],
  studentCount: 0,
  studentNext: null,
  studentPrevious: null,

  fetching: false,
  errors: null,
});

const tutorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case tutorsConstants.GET_STUDENT_REQUESTS_LIST_REQUEST:
    case tutorsConstants.CREATE_STUDENT_REQUEST_REQUEST:
    case tutorsConstants.GET_STUDENT_REQUEST_REQUEST:
    case tutorsConstants.DELETE_STUDENT_REQUEST_REQUEST:
    case tutorsConstants.ACCEPT_STUDENT_REQUEST_REQUEST:
    case tutorsConstants.GET_STUDENTS_LIST_REQUEST:
    case tutorsConstants.GET_STUDENT_REQUEST:
    case tutorsConstants.DELETE_STUDENT_REQUEST:
      return state.merge({
        fetching: true,
      });

    case tutorsConstants.GET_STUDENT_REQUESTS_LIST_SUCCESS:
      return state.merge({
        studentRequests: action.payload.results,
        studentRequestsCount: action.payload.count,
        studentRequestsNext: action.payload.next,
        studentRequestsPrevious: action.payload.previous,
        fetching: false,
        errors: null,
      });

    case tutorsConstants.GET_STUDENT_REQUEST_SUCCESS:
      return state.merge({
        studentRequest: action.payload,
        fetching: false,
        errors: null,
      });

    case tutorsConstants.GET_STUDENTS_LIST_SUCCESS:
      return state.merge({
        students: action.payload.results,
        studentCount: action.payload.count,
        studentNext: action.payload.next,
        studentPrevious: action.payload.previous,
        fetching: false,
        errors: null,
      });

    case tutorsConstants.GET_STUDENT_SUCCESS:
      return state.merge({
        student: action.payload,
        fetching: false,
        errors: null,
      });

    case tutorsConstants.CREATE_STUDENT_REQUEST_SUCCESS:
    case tutorsConstants.DELETE_STUDENT_REQUEST_SUCCESS:
    case tutorsConstants.ACCEPT_STUDENT_REQUEST_SUCCESS:
    case tutorsConstants.DELETE_STUDENT_SUCCESS:
      return state.merge({
        fetching: false,
        errors: null,
      });

    case tutorsConstants.GET_STUDENT_REQUESTS_LIST_FAILURE:
    case tutorsConstants.CREATE_STUDENT_REQUEST_FAILURE:
    case tutorsConstants.GET_STUDENT_REQUEST_FAILURE:
    case tutorsConstants.DELETE_STUDENT_REQUEST_FAILURE:
    case tutorsConstants.ACCEPT_STUDENT_REQUEST_FAILURE:
    case tutorsConstants.GET_STUDENTS_LIST_FAILURE:
    case tutorsConstants.GET_STUDENT_FAILURE:
    case tutorsConstants.DELETE_STUDENT_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default tutorsReducer;
