import Immutable from 'seamless-immutable';

import { vkAppsUsersConstants } from 'constants/api';

const initialState = Immutable({
  user: null,
  fetching: false,
  errors: null,
});

const vkAppsUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case vkAppsUsersConstants.CREATE_VK_APPS_USER_REQUEST:
    case vkAppsUsersConstants.GET_VK_APPS_USER_REQUEST:
    case vkAppsUsersConstants.DELETE_VK_APPS_USER_REQUEST:
    case vkAppsUsersConstants.CONNECT_VK_APPS_USER_REQUEST:
      return state.merge({
        fetching: true,
      });

    case vkAppsUsersConstants.GET_VK_APPS_USER_SUCCESS:
      return state.merge({
        user: action.payload,
        fetching: false,
        errors: null,
      });

    case vkAppsUsersConstants.CREATE_VK_APPS_USER_SUCCESS:
    case vkAppsUsersConstants.DELETE_VK_APPS_USER_SUCCESS:
    case vkAppsUsersConstants.CONNECT_VK_APPS_USER_SUCCESS:
      return state.merge({
        fetching: false,
        errors: null,
      });

    case vkAppsUsersConstants.CREATE_VK_APPS_USER_FAILURE:
    case vkAppsUsersConstants.GET_VK_APPS_USER_FAILURE:
    case vkAppsUsersConstants.DELETE_VK_APPS_USER_FAILURE:
    case vkAppsUsersConstants.CONNECT_VK_APPS_USER_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default vkAppsUsersReducer;
