import Immutable from 'seamless-immutable';

import { apiProfileConstants } from '../constants';

const initialState = Immutable({
  profile: {},
  fetching: false,
  errors: null,
});

const apiProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiProfileConstants.CREATE_PROFILE_REQUEST:
    case apiProfileConstants.UPDATE_PROFILE_REQUEST:
    case apiProfileConstants.GET_PROFILE_REQUEST:
    case apiProfileConstants.DEACTIVATE_PROFILE_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiProfileConstants.CREATE_PROFILE_SUCCESS:
    case apiProfileConstants.UPDATE_PROFILE_SUCCESS:
    case apiProfileConstants.DEACTIVATE_PROFILE_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case apiProfileConstants.GET_PROFILE_SUCCESS:
      return state.merge({
        profile: action.payload,
        errors: null,
      });

    case apiProfileConstants.CREATE_PROFILE_FAILURE:
    case apiProfileConstants.UPDATE_PROFILE_FAILURE:
    case apiProfileConstants.GET_PROFILE_FAILURE:
    case apiProfileConstants.DEACTIVATE_PROFILE_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiProfileReducer;
