import Immutable from 'seamless-immutable';

import { apiLessonConstants } from '../constants';

const initialState = Immutable({
  lessons: [],
  fetching: false,
  errors: null,
});

const apiLessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiLessonConstants.CREATE_LESSON_REQUEST:
    case apiLessonConstants.GET_LESSONS_REQUEST:
    case apiLessonConstants.UPDATE_LESSONS_REQUEST:
    case apiLessonConstants.DELETE_LESSON_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiLessonConstants.CREATE_LESSON_SUCCESS:
    case apiLessonConstants.UPDATE_LESSONS_SUCCESS:
    case apiLessonConstants.DELETE_LESSON_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case apiLessonConstants.GET_LESSONS_SUCCESS:
      return state.merge({
        lessons: action.payload,
        fetching: false,
        errors: null,
      });

    case apiLessonConstants.CREATE_LESSON_FAILURE:
    case apiLessonConstants.GET_LESSONS_FAILURE:
    case apiLessonConstants.UPDATE_LESSONS_FAILURE:
    case apiLessonConstants.DELETE_LESSON_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiLessonReducer;
