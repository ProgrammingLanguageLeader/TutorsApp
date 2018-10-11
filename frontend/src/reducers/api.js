import { apiConstants } from '../constants/api';

const initialState = {
  profile: {},
  vacancy: {},
  vacancies: {},
  students: [],
  applications: [],
  lessons: [],
  fetching: false,
  errors: undefined,
  vacancyCreated: null,
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiConstants.ACCEPT_APPLICATION_REQUEST:
    case apiConstants.ADD_APPLICATION_REQUEST:
    case apiConstants.ADD_LESSON_REQUEST:
    case apiConstants.CREATE_PROFILE_REQUEST: 
    case apiConstants.DELETE_APPLICATION_REQUEST:
    case apiConstants.DELETE_LESSON_REQUEST:
    case apiConstants.DELETE_PROFILE_REQUEST: 
    case apiConstants.DELETE_VACANCY_REQUEST:
    case apiConstants.GET_APPLICATIONS_REQUEST:
    case apiConstants.GET_LESSONS_REQUEST:
    case apiConstants.GET_PROFILE_REQUEST:
    case apiConstants.GET_STUDENTS_REQUEST:
    case apiConstants.GET_VACANCY_REQUEST:
    case apiConstants.SEARCH_VACANCIES_REQUEST:
    case apiConstants.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        errors: undefined,
        fetching: true,
      };

    case apiConstants.CREATE_VACANCY_REQUEST:
      return {
        ...state,
        errors: undefined,
        fetching: true,
        vacancyCreated: null,
      };

    case apiConstants.ACCEPT_APPLICATION_FAILURE:
    case apiConstants.ADD_APPLICATION_FAILURE:
    case apiConstants.ADD_LESSON_FAILURE:
    case apiConstants.CREATE_PROFILE_FAILURE: 
    case apiConstants.DELETE_APPLICATION_FAILURE:
    case apiConstants.DELETE_LESSON_FAILURE:
    case apiConstants.DELETE_PROFILE_FAILURE: 
    case apiConstants.DELETE_VACANCY_FAILURE:
    case apiConstants.GET_APPLICATIONS_FAILURE:
    case apiConstants.GET_LESSONS_FAILURE:
    case apiConstants.GET_PROFILE_FAILURE:
    case apiConstants.GET_STUDENTS_FAILURE:
    case apiConstants.GET_VACANCY_FAILURE:
    case apiConstants.SEARCH_VACANCIES_FAILURE:
    case apiConstants.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };

    case apiConstants.CREATE_VACANCY_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: action.payload,
        vacancyCreated: false,
      };

    case apiConstants.ACCEPT_APPLICATION_SUCCESS:
    case apiConstants.ADD_APPLICATION_SUCCESS:
    case apiConstants.ADD_LESSON_SUCCESS:
    case apiConstants.CREATE_PROFILE_SUCCESS:
    case apiConstants.DELETE_APPLICATION_SUCCESS:
    case apiConstants.DELETE_LESSON_SUCCESS:
    case apiConstants.DELETE_PROFILE_SUCCESS:
    case apiConstants.DELETE_VACANCY_SUCCESS:
    case apiConstants.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        fetching: false,
      };

    case apiConstants.CREATE_VACANCY_SUCCESS:
      return {
        ...state,
        fetching: false,
        vacancyCreated: true,
      };

    case apiConstants.GET_APPLICATIONS_SUCCESS: 
      return {
        ...state,
        fetching: false,
        applications: action.payload,
      };

    case apiConstants.GET_LESSONS_SUCCESS:
      return {
        ...state,
        fetching: false,
        lessons: action.payload,
      };

    case apiConstants.GET_PROFILE_SUCCESS:
      return {
        ...state,
        fetching: false,
        profile: action.payload,
      };

    case apiConstants.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        students: action.payload,
      };

    case apiConstants.SEARCH_VACANCIES_SUCCESS: {
      let vacancies = {};
      action.payload.forEach(vacancy => {
        vacancies[vacancy.id] = vacancy;
      });
      return {
        ...state,
        fetching: false,
        vacancies: vacancies,
      };
    }
    
    case apiConstants.GET_VACANCY_SUCCESS:
      return {
        ...state,
        fetching: false,
        vacancy: action.payload,
      }

    default:
      return state;
  }
};

export default apiReducer;