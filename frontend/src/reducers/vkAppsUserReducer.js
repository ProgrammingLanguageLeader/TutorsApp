import Immutable from 'seamless-immutable';

import { vkAppsConstants } from '../constants';

const initialState = Immutable({
  vkUserInfo: {},
  errors: null,
  fetching: false,
});

const vkAppsUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case vkAppsConstants.VK_GET_USER_INFO_REQUEST:
      return state.merge({
        fetching: true,
      });

    case vkAppsConstants.VK_GET_USER_INFO_FAILED:
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

    default:
      return state;
  }
};

export default vkAppsUserReducer;
