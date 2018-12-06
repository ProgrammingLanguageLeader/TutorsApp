import Immutable from 'seamless-immutable';

import { vkApiConstants } from '../constants';

const initialState = Immutable({
  vkUsersInfo: new Map(),
  notificationStatus: null,
  errors: null,
  fetching: false,
});

const vkApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case vkApiConstants.VK_API_USERS_GET_REQUEST:
    case vkApiConstants.VK_API_NOTIFICATION_STATUS_REQUEST:
      return state.merge({
        fetching: true,
      });

    case vkApiConstants.VK_API_USERS_GET_FETCHED:
      let { vkUsersInfo } = new Map();
      action.payload.forEach(userInfo => {
        vkUsersInfo.set(userInfo.id, {
          firstName: userInfo.first_name,
          lastName: userInfo.last_name,
          city: userInfo.city,
          photo_100: userInfo.photo_100,
          photo_200: userInfo.photo_200,
        });
      });
      return state.merge({
        vkUsersInfo: vkUsersInfo,
        errors: null,
        fetching: false,
      });

    case vkApiConstants.VK_API_NOTIFICATION_STATUS_FETCHED:
      return state.merge({
        notificationStatus: action.payload,
        errors: null,
        fetching: false,
      });

    case vkApiConstants.VK_API_USERS_GET_FAILED:
    case vkApiConstants.VK_API_NOTIFICATION_STATUS_FAILED:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default vkApiReducer;
