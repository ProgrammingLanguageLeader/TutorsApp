import Immutable from 'seamless-immutable';

import { vkAppsConstants } from '../constants';

const initialState = Immutable({
  vkUserInfo: {},
  accessToken: null,
  errors: null,
  fetching: false,
});

const vkAppsReducer = (state = initialState, action) => {
  switch (action.type) {
    case vkAppsConstants.VK_GET_ACCESS_TOKEN_REQUEST:
    case vkAppsConstants.VK_GET_USER_INFO_REQUEST:
    case vkAppsConstants.VK_ALLOW_NOTIFICATIONS_REQUEST:
    case vkAppsConstants.VK_DENY_NOTIFICATIONS_REQUEST:
      return state.merge({
        fetching: true,
      });

    case vkAppsConstants.VK_GET_ACCESS_TOKEN_FAILED:
    case vkAppsConstants.VK_GET_USER_INFO_FAILED:
    case vkAppsConstants.VK_ALLOW_NOTIFICATIONS_FAILURE:
    case vkAppsConstants.VK_DENY_NOTIFICATIONS_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    case vkAppsConstants.VK_GET_USER_INFO_FETCHED:
      return state.merge({
        errors: null,
        vkUserInfo: action.payload,
        fetching: false,
      });

    case vkAppsConstants.VK_GET_ACCESS_TOKEN_FETCHED:
      return state.merge({
        errors: null,
        accessToken: action.payload,
        fetching: false,
      });

    case vkAppsConstants.VK_ALLOW_NOTIFICATIONS_SUCCESS:
    case vkAppsConstants.VK_DENY_NOTIFICATIONS_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    default:
      return state;
  }
};

export default vkAppsReducer;
