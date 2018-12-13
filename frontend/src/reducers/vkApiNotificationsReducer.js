import Immutable from 'seamless-immutable';

import { vkApiConstants } from '../constants';

const initialState = Immutable({
  notificationsStatus: null,
  errors: null,
  fetching: false,
});

const vkApiNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case vkApiConstants.VK_API_NOTIFICATION_STATUS_REQUEST:
      return state.merge({
        fetching: true,
      });

    case vkApiConstants.VK_API_NOTIFICATION_STATUS_FETCHED:
      return state.merge({
        notificationsStatus: action.payload,
        errors: null,
        fetching: false,
      });

    case vkApiConstants.VK_API_NOTIFICATION_STATUS_FAILED:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default vkApiNotificationsReducer;
