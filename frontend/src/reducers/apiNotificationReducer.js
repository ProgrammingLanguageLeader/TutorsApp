import Immutable from 'seamless-immutable';

import { apiNotificationConstants } from '../constants';

const initialState = Immutable({
  notifications: [],
  fetching: false,
  errors: null,
});

const apiNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiNotificationConstants.GET_NOTIFICATIONS_REQUEST:
    case apiNotificationConstants.MARK_NOTIFICATION_AS_SEEN_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiNotificationConstants.MARK_NOTIFICATION_AS_SEEN_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case apiNotificationConstants.GET_NOTIFICATIONS_SUCCESS:
      return state.merge({
        notifications: action.payload,
      });

    case apiNotificationConstants.GET_NOTIFICATIONS_FAILURE:
    case apiNotificationConstants.MARK_NOTIFICATION_AS_SEEN_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiNotificationReducer;
