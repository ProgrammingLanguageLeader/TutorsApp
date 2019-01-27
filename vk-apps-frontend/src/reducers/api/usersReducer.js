import Immutable from 'seamless-immutable';

import { usersConstants } from 'constants/api';

const initialState = Immutable({
  user: {},
  users: [],
  usersCount: 0,
  usersNext: null,
  usersPrevious: null,
  fetching: false,
  errors: null,
});

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case usersConstants.GET_USERS_LIST_REQUEST:
    case usersConstants.CREATE_USER_REQUEST:
    case usersConstants.GET_USER_REQUEST:
    case usersConstants.UPDATE_USER_REQUEST:
    case usersConstants.DELETE_USER_REQUEST:
      return state.merge({
        fetching: true,
      });

    case usersConstants.GET_USERS_LIST_SUCCESS:
      return state.merge({
        users: action.payload.results,
        usersCount: action.payload.count,
        usersNext: action.payload.next,
        usersPrevious: action.payload.previous,
        fetching: false,
        errors: null,
      });

    case usersConstants.GET_USER_SUCCESS:
      return state.merge({
        user: action.payload,
        fetching: false,
        errors: null,
      });

    case usersConstants.CREATE_USER_SUCCESS:
    case usersConstants.UPDATE_USER_SUCCESS:
    case usersConstants.DELETE_USER_SUCCESS:
      return state.merge({
        fetching: false,
        errors: null,
      });

    case usersConstants.GET_USERS_LIST_FAILURE:
    case usersConstants.CREATE_USER_FAILURE:
    case usersConstants.GET_USER_FAILURE:
    case usersConstants.UPDATE_USER_FAILURE:
    case usersConstants.DELETE_USER_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default usersReducer;
