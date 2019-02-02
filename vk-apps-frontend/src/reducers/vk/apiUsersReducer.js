import Immutable from 'seamless-immutable';

import { apiConstants } from 'vk-apps-frontend/constants/vk';

const initialState = Immutable({
  vkUsersInfo: {},
  errors: null,
  fetching: false,
});

const apiUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiConstants.VK_API_USERS_GET_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiConstants.VK_API_USERS_GET_FETCHED:
      let vkUsersInfo = {};
      action.payload.forEach(userInfo => {
        vkUsersInfo[userInfo.id] = {
          firstName: userInfo.first_name,
          lastName: userInfo.last_name,
          city: userInfo.city,
          photo_100: userInfo.photo_100,
          photo_200: userInfo.photo_200,
        };
      });
      return state.merge({
        vkUsersInfo: vkUsersInfo,
        errors: null,
        fetching: false,
      });

    case apiConstants.VK_API_USERS_GET_FAILED:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiUsersReducer;
