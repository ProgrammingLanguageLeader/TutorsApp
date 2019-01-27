import Immutable from 'seamless-immutable';

import { lessonsConstants } from 'constants/api';

const initialState = Immutable({
  lesson: {},
  lessons: [],
  lessonsCount: 0,
  lessonsNext: null,
  lessonsPrevious: null,
  fetching: false,
  errors: null,
});

const lessonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case lessonsConstants.CREATE_LESSON_REQUEST:
    case lessonsConstants.GET_LESSONS_LIST_REQUEST:
    case lessonsConstants.UPDATE_LESSON_REQUEST:
    case lessonsConstants.GET_LESSON_REQUEST:
    case lessonsConstants.DELETE_LESSON_REQUEST:
      return state.merge({
        fetching: true,
      });

    case lessonsConstants.CREATE_LESSON_SUCCESS:
    case lessonsConstants.UPDATE_LESSON_SUCCESS:
    case lessonsConstants.DELETE_LESSON_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case lessonsConstants.GET_LESSON_SUCCESS:
      return state.merge({
        lesson: action.payload,
        errors: null,
        fetching: false,
      });

    case lessonsConstants.GET_LESSONS_LIST_SUCCESS:
      return state.merge({
        lessons: action.payload.results,
        lessonsCount: action.payload.count,
        lessonsNext: action.payload.next,
        lessonsPrevious: action.payload.previous,
        fetching: false,
        errors: null,
      });

    case lessonsConstants.CREATE_LESSON_FAILURE:
    case lessonsConstants.GET_LESSON_FAILURE:
    case lessonsConstants.GET_LESSONS_LIST_FAILURE:
    case lessonsConstants.UPDATE_LESSON_FAILURE:
    case lessonsConstants.DELETE_LESSON_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default lessonsReducer;
