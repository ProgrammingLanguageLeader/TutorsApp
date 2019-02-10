import Immutable from 'seamless-immutable';

import { appsConstants } from 'vk-apps-frontend/constants/vk';

const initialState = Immutable({
  success: null,
  errors: null,
  fetching: false,
});

const appsPayReducer = (state = initialState, action) => {
  switch (action.type) {
    case appsConstants.VK_PAY_REQUEST:
      return state.merge({
        fetching: true,
      });

    case appsConstants.VK_PAY_SUCCESS:
      return state.merge({
        success: true,
        errors: null,
        fetching: false,
      });

    case appsConstants.VK_PAY_FAILURE:
      return state.merge({
        success: null,
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default appsPayReducer;