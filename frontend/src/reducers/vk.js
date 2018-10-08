import { vkConstants } from '../constants/vk';

const initialState = {
  accessToken: null,
  notificationStatus: null,
  logs: null,
  userInfo: {},
  usersInfo: new Map(),
};

const vkReducer = (state = initialState, action) => {
  switch (action.type) {
    case vkConstants.VK_GET_ACCESS_TOKEN_FAILED:
    case vkConstants.VK_NOTIFICATION_STATUS_FAILED:
    case vkConstants.VK_GET_USER_INFO_FAILED:
    case vkConstants.VK_API_USERS_GET_FAILED:
      return {
        ...state,
        logs: action.error,
      };

    case vkConstants.VK_GET_USER_INFO_FETCHED:
      return {
        ...state,
        userInfo: action.userInfo,
      };

    case vkConstants.VK_GET_ACCESS_TOKEN_FETCHED:
      return {
        ...state,
        accessToken: action.accessToken,
      };

    case vkConstants.VK_NOTIFICATION_STATUS_FETCHED:
      return {
        ...state,
        notificationStatus: action.notificationStatus,
      };

    case vkConstants.VK_API_USERS_GET_FETCHED: {
      let { usersInfo } = state;
      action.usersInfo.forEach(userInfo => {
        usersInfo.set(Number(userInfo.id), {
          firstName: userInfo.first_name,
          lastName: userInfo.last_name,
          city: userInfo.city,
          photo_100: userInfo.photo_100,
          photo_200: userInfo.photo_200,
        });
      });
      return {
        ...state,
        usersInfo,
      };
    }
    
    default:
      return state;
  }
};

export default vkReducer;