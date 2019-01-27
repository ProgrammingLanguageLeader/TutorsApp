import Immutable from 'seamless-immutable';

import { appsConstants } from '../../constants';

const initialState = Immutable({
  vkUserInfo: {},
  errors: null,
  fetching: false,
});

const appsUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case appsConstants.VK_GET_USER_INFO_REQUEST:
      return state.merge({
        fetching: true,
      });

    case appsConstants.VK_GET_USER_INFO_FAILED:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    case appsConstants.VK_GET_USER_INFO_FETCHED:
      return state.merge({
        errors: null,
        vkUserInfo: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default appsUserReducer;
