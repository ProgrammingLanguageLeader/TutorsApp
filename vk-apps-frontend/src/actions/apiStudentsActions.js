import { makeApiRequest } from "../services/api";
import { apiStudentsConstants } from "../constants";

const getStudents = (options) => {
  return async dispatch => {
    dispatch({
      type: apiStudentsConstants.GET_STUDENTS_REQUEST,
    });
    return makeApiRequest('get_students', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiStudentsConstants.GET_STUDENTS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiStudentsConstants.GET_STUDENTS_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

const deleteStudent = (options) => {
  return async dispatch => {
    dispatch({
      type: apiStudentsConstants.DELETE_STUDENT_REQUEST,
    });
    return makeApiRequest('delete_student', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiStudentsConstants.DELETE_STUDENT_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiStudentsConstants.DELETE_STUDENT_FAILURE,
            payload: errors,
          });
        }
      )
  };
};

export const apiStudentsActions = {
  getStudents, deleteStudent,
};
