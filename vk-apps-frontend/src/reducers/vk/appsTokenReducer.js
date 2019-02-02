import Immutable from 'seamless-immutable';

import { appsConstants } from 'vk-apps-frontend/constants/vk';

const initialState = Immutable({
  accessToken: null,
  errors: null,
  fetching: false,
});

const appsTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case appsConstants.VK_GET_ACCESS_TOKEN_REQUEST:
      return state.merge({
        fetching: true,
      });

    case appsConstants.VK_GET_ACCESS_TOKEN_FAILED:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    case appsConstants.VK_GET_ACCESS_TOKEN_FETCHED:
      return state.merge({
        errors: null,
        accessToken: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default appsTokenReducer;
