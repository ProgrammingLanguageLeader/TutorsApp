import Immutable from 'seamless-immutable';

import { vkAppsUsersConstants } from 'vk-apps-frontend/constants/api';

const initialState = Immutable({
  user: null,
  vkId: null,
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

    case vkAppsUsersConstants.GET_VK_APPS_USER_SUCCESS: {
      const { user, vk_id } = action.payload;
      return state.merge({
        user: user,
        vkId: vk_id,
        fetching: false,
        errors: null,
      });
    }

    case vkAppsUsersConstants.CREATE_VK_APPS_USER_SUCCESS:
      const { user, vk_id } = action.payload;
      return state.merge({
        user: user,
        vkId: vk_id,
        fetching: false,
        errors: null,
      });

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
      if (action.payload.response) {
        return state.merge({
          errors: action.payload.response.data,
          fetching: false,
        });
      }
      return state.merge({
        errors: ['Network error'],
        fetching: false,
      });

    default:
      return state;
  }
};

export default vkAppsUsersReducer;