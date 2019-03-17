import Immutable from 'seamless-immutable';

import { appsConstants } from 'vk-apps-frontend/constants/vk';

const executionUrl = new URL(window.location.href);
const notificationsStatus = Number(executionUrl.searchParams.get('vk_are_notifications_enabled'));

const initialState = Immutable({
  isAllowed: Boolean(notificationsStatus),
  fetching: false,
  errors: null,
});

const appsPayReducer = (state = initialState, action) => {
  switch (action.type) {
    case appsConstants.VK_ALLOW_NOTIFICATIONS_REQUEST:
      return state.merge({
        fetching: true,
      });

    case appsConstants.VK_ALLOW_NOTIFICATIONS_SUCCESS:
      return state.merge({
        isAllowed: true,
        fetching: false,
        errors: null,
      });

    case appsConstants.VK_DENY_NOTIFICATIONS_SUCCESS:
      return state.merge({
        isAllowed: false,
        fetching: false,
        errors: null,
      });

    case appsConstants.VK_ALLOW_NOTIFICATIONS_FAILURE:
    case appsConstants.VK_DENY_NOTIFICATIONS_FAILURE:
      return state.merge({
        fetching: false,
        errors: action.payload,
      });

    default:
      return state;
  }
};

export default appsPayReducer;