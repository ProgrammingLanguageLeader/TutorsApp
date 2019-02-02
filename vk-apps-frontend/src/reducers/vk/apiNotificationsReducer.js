import Immutable from 'seamless-immutable';

import { apiConstants } from 'vk-apps-frontend/constants/vk';

const initialState = Immutable({
  notificationsStatus: null,
  errors: null,
  fetching: false,
});

const apiNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiConstants.VK_API_NOTIFICATION_STATUS_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiConstants.VK_API_NOTIFICATION_STATUS_FETCHED:
      return state.merge({
        notificationsStatus: action.payload,
        errors: null,
        fetching: false,
      });

    case apiConstants.VK_API_NOTIFICATION_STATUS_FAILED:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiNotificationsReducer;
