import Immutable from 'seamless-immutable';

import { usersConstants } from 'vk-apps-frontend/constants/api';

const initialState = Immutable({
  user: null,
  users: [],
  usersCount: 0,
  usersNext: null,
  usersPrevious: null,
  fetching: false,
  errors: null,
  success: null,
});

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case usersConstants.GET_USERS_LIST_REQUEST:
    case usersConstants.CREATE_USER_REQUEST:
    case usersConstants.GET_USER_REQUEST:
    case usersConstants.UPDATE_USER_REQUEST:
    case usersConstants.DELETE_USER_REQUEST:
    case usersConstants.UPLOAD_AVATAR_REQUEST:
      return state.merge({
        ...initialState,
        fetching: true,
      });

    case usersConstants.GET_USERS_LIST_SUCCESS:
      return state.merge({
        ...initialState,
        users: action.payload.results,
        usersCount: action.payload.count,
        usersNext: action.payload.next,
        usersPrevious: action.payload.previous,
        fetching: false,
        errors: null,
        success: true,
      });

    case usersConstants.GET_USER_SUCCESS:
      return state.merge({
        ...initialState,
        user: action.payload,
        fetching: false,
        errors: null,
        success: true,
      });

    case usersConstants.CREATE_USER_SUCCESS:
    case usersConstants.UPDATE_USER_SUCCESS:
    case usersConstants.DELETE_USER_SUCCESS:
    case usersConstants.UPLOAD_AVATAR_SUCCESS:
      return state.merge({
        ...initialState,
        fetching: false,
        errors: null,
        success: true,
      });

    case usersConstants.GET_USERS_LIST_FAILURE:
    case usersConstants.CREATE_USER_FAILURE:
    case usersConstants.GET_USER_FAILURE:
    case usersConstants.UPDATE_USER_FAILURE:
    case usersConstants.DELETE_USER_FAILURE:
    case usersConstants.UPLOAD_AVATAR_FAILURE:
      return state.merge({
        ...initialState,
        errors: action.payload.response.data,
        fetching: false,
      });

    default:
      return state;
  }
};

export default usersReducer;
