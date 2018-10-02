import { vkConstants } from '../constants/vk';

const initialState = {
  accessToken: null,
  notificationStatus: null,
  insets: null,
  logs: null,
};

const vkReducer = (state = initialState, action) => {
  switch (action.type) {
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

    case vkConstants.VK_INSETS_FETCHED:
      return {
        ...state,
        insets: action.insets,
      };

    case vkConstants.VK_GET_ACCESS_TOKEN_FAILED:
      return {
        ...state,
        logs: action.error,
      };

    case vkConstants.VK_NOTIFICATION_STATUS_FAILED:
      return {
        ...state,
        logs: action.error,
      };

    default:
      return state;
  }
};

export default vkReducer;