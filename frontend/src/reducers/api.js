import { apiConstants } from '../constants/api';

const initialState = {
  profile: null,
  vacancies: [],
  students: [],
  lessonsSchedule: [],
  fetching: false,
  errors: [],
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiConstants.CREATE_PROFILE_REQUEST: 
    case apiConstants.CREATE_VACANCY_REQUEST:
    case apiConstants.ADD_LESSON_REQUEST:
    case apiConstants.GET_PROFILE_REQUEST:
    case apiConstants.SEARCH_VACANCY_REQUEST:
    case apiConstants.GET_ACTIVE_VACANCIES_REQUEST:
    case apiConstants.GET_STUDENTS_REQUEST:
    case apiConstants.DELETE_SCHEDULE_REQUEST:
    case apiConstants.DELETE_VACANCY_REQUEST:
    case apiConstants.DELETE_PROFILE_REQUEST: 
      return {
        ...state,
        fetching: true,
      };

    case apiConstants.CREATE_PROFILE_FAILURE:
    case apiConstants.CREATE_VACANCY_FAILURE:
    case apiConstants.ADD_LESSON_FAILURE:
    case apiConstants.GET_PROFILE_FAILURE:
    case apiConstants.SEARCH_VACANCY_FAILURE:
    case apiConstants.GET_ACTIVE_VACANCIES_FAILURE:
    case apiConstants.GET_STUDENTS_FAILURE:
    case apiConstants.DELETE_SCHEDULE_FAILURE:
    case apiConstants.DELETE_VACANCY_FAILURE:
    case apiConstants.DELETE_PROFILE_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };

    case apiConstants.CREATE_PROFILE_SUCCESS:
    case apiConstants.CREATE_VACANCY_SUCCESS:
    case apiConstants.ADD_LESSON_SUCCESS:
    case apiConstants.DELETE_PROFILE_SUCCESS:
    case apiConstants.DELETE_SCHEDULE_SUCCESS:
    case apiConstants.DELETE_VACANCY_SUCCESS:
      return {
        ...state,
        fetching: false,
      };

    case apiConstants.GET_PROFILE_SUCCESS:
      return {
        ...state,
        fetching: false,
        profile: action.payload,
      };

    case apiConstants.SEARCH_VACANCY_SUCCESS:
      return {
        ...state,
        fetching: false,
        vacancies: action.payload,
      };

    case apiConstants.GET_ACTIVE_VACANCIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        vacancies: action.payload,
      };

    case apiConstants.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        students: action.payload,
      };
    
    default:
      return state;
  }
};

export default apiReducer;