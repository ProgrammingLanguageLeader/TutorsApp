import Immutable from 'seamless-immutable';

import { vkAppsConstants } from '../constants';

const initialState = Immutable({
  accessToken: null,
  errors: null,
  fetching: false,
});

const vkAppsTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case vkAppsConstants.VK_GET_ACCESS_TOKEN_REQUEST:
      return state.merge({
        fetching: true,
      });

    case vkAppsConstants.VK_GET_ACCESS_TOKEN_FAILED:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    case vkAppsConstants.VK_GET_ACCESS_TOKEN_FETCHED:
      return state.merge({
        errors: null,
        accessToken: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default vkAppsTokenReducer;
