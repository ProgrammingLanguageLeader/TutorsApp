import Immutable from 'seamless-immutable';

import { notificationsConstants } from '../../constants';

const initialState = Immutable({
  notifications: [],
  fetching: false,
  errors: null,
});

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationsConstants.GET_NOTIFICATIONS_REQUEST:
    case notificationsConstants.MARK_NOTIFICATION_AS_SEEN_REQUEST:
      return state.merge({
        fetching: true,
      });

    case notificationsConstants.MARK_NOTIFICATION_AS_SEEN_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case notificationsConstants.GET_NOTIFICATIONS_SUCCESS:
      return state.merge({
        notifications: action.payload,
        fetching: false,
        errors: null,
      });

    case notificationsConstants.GET_NOTIFICATIONS_FAILURE:
    case notificationsConstants.MARK_NOTIFICATION_AS_SEEN_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default notificationsReducer;
