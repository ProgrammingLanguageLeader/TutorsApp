import { makeApiRequest } from '../services/api';
import { apiConstants } from '../constants/api';

const acceptApplication = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.ACCEPT_APPLICATION_REQUEST
    });
    return makeApiRequest('accept_application', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.ACCEPT_APPLICATION_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.ACCEPT_APPLICATION_FAILURE,
          payload: errors,
        });
      }
    )
  }
};

const addApplication = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.ADD_APPLICATION_REQUEST
    });
    return makeApiRequest('add_application', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.ADD_APPLICATION_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.ADD_APPLICATION_FAILURE,
          payload: errors,
        });
      }
    )
  }
};

const addLesson = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.ADD_LESSON_REQUEST
    });
    return makeApiRequest('add_lesson', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.ADD_LESSON_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.ADD_LESSON_FAILURE,
          payload: errors,
        });
      }
    )
  }
};

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
          type: apiConstants.CREATE_VACANCY_FAILURE,
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

const updateProfile = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.UPDATE_PROFILE_REQUEST,
    });
    return makeApiRequest('update_profile', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.UPDATE_PROFILE_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.UPDATE_PROFILE_FAILURE,
          payload: errors,
        })
      }
    )
  }
};

const searchVacancies = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.SEARCH_VACANCIES_REQUEST,
    });
    return makeApiRequest('search_vacancies', 'get', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.SEARCH_VACANCIES_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.SEARCH_VACANCIES_FAILURE,
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

const deleteApplication = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.DELETE_APPLICATION_REQUEST,
    });
    return makeApiRequest('delete_application', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.DELETE_APPLICATION_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.DELETE_APPLICATION_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

const deleteLesson = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.DELETE_LESSON_REQUEST,
    });
    return makeApiRequest('delete_lesson', 'post', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.DELETE_LESSON_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.DELETE_LESSON_FAILURE,
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

const getApplications = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.GET_APPLICATIONS_REQUEST,
    });
    return makeApiRequest('get_applications', 'get', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.GET_APPLICATIONS_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.GET_APPLICATIONS_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

const getLessons = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.GET_LESSONS_REQUEST,
    });
    return makeApiRequest('get_lessons', 'get', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.GET_LESSONS_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.GET_LESSONS_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

const getVacancy = (options) => {
  return dispatch => {
    dispatch({
      type: apiConstants.GET_VACANCY_REQUEST,
    });
    return makeApiRequest('get_vacancy', 'get', options)
    .then(
      response => {
        dispatch({
          type: apiConstants.GET_VACANCY_SUCCESS,
          payload: response,
        })
      },
      errors => {
        dispatch({
          type: apiConstants.GET_VACANCY_FAILURE,
          payload: errors,
        });
      }
    )
  };
};

export const apiActions = {
  createProfile, createVacancy, getProfile, 
  searchVacancies, getStudents, deleteLesson, 
  deleteVacancy, deleteProfile, updateProfile, 
  acceptApplication, addApplication, addLesson, 
  deleteApplication, getApplications, getLessons, 
  getVacancy, 
};