import { vkApiConstants } from '../constants';

const initialState = {
  vkUsersInfo: new Map(),
  notificationStatus: null,
  errors: null,
  fetching: false,
};

const vkApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case vkApiConstants.VK_API_USERS_GET_REQUEST:
    case vkApiConstants.VK_API_NOTIFICATION_STATUS_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case vkApiConstants.VK_API_USERS_GET_FETCHED:
      let vkUsersInfo = new Map();
      action.payload.forEach(userInfo => {
        vkUsersInfo.set(userInfo.id, {
          firstName: userInfo.first_name,
          lastName: userInfo.last_name,
          city: userInfo.city,
          photo_100: userInfo.photo_100,
          photo_200: userInfo.photo_200,
        });
      });
      return {
        ...state,
        vkUsersInfo: vkUsersInfo,
        errors: null,
        fetching: false,
      };

    case vkApiConstants.VK_API_NOTIFICATION_STATUS_FETCHED:
      return {
        ...state,
        notificationStatus: action.payload,
        errors: null,
        fetching: false,
      };

    case vkApiConstants.VK_API_USERS_GET_FAILED:
    case vkApiConstants.VK_API_NOTIFICATION_STATUS_FAILED:
      return {
        ...state,
        errors: action.payload,
        fetching: false,
      };

    case vkApiConstants.VK_API_STOP_FETCHING:
      return {
        ...state,
        errors: null,
        fetching: false,
      };

    default:
      return state;
  }
};

export default vkApiReducer;
