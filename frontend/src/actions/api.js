import { makeApiRequest } from '../services/api';
import { apiConstants } from '../constants/api';

const createProfile = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.CREATE_PROFILE_REQUEST,
    });
    return makeApiRequest('create_profile', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.CREATE_PROFILE_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.CREATE_PROFILE_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

const createVacancy = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.CREATE_VACANCY_REQUEST,
    });
    return makeApiRequest('create_vacancy', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.CREATE_VACANCY_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.CREATE_PROFILE_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

const addSchedule = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.ADD_SHEDULE_REQUEST,
    });
    return makeApiRequest('add_schedule', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.ADD_SHEDULE_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.ADD_SHEDULE_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

const getProfile = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.GET_PROFILE_REQUEST,
    });
    return makeApiRequest('get_profile', 'get', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.GET_PROFILE_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.GET_PROFILE_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

const searchVacancy = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.SEARCH_VACANCY_REQUEST,
    });
    return makeApiRequest('search_vacancy', 'get', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.SEARCH_VACANCY_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.SEARCH_VACANCY_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

const getActiveVacancies = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.GET_ACTIVE_VACANCIES_REQUEST,
    });
    return makeApiRequest('get_active_vacancies', 'get', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.GET_ACTIVE_VACANCIES_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.GET_ACTIVE_VACANCIES_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

const getStudents = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.GET_STUDENTS_REQUEST,
    });
    return makeApiRequest('get_students', 'get', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.GET_STUDENTS_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.GET_STUDENTS_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

const deleteSchedule = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.DELETE_SCHEDULE_REQUEST,
    });
    return makeApiRequest('delete_schedule', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.DELETE_SCHEDULE_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.DELETE_SCHEDULE_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

const deleteVacancy = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.DELETE_VACANCY_REQUEST,
    });
    return makeApiRequest('delete_vacancy', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.DELETE_VACANCY_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.DELETE_VACANCY_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

const deleteProfile = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.DELETE_PROFILE_REQUEST,
    });
    return makeApiRequest('delete_profile', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.DELETE_PROFILE_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.DELETE_PROFILE_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

export const apiActions = {
  createProfile, createVacancy, addSchedule,
  getProfile, searchVacancy, getActiveVacancies,
  getStudents, deleteSchedule, deleteVacancy, 
  deleteProfile,
};