import Immutable from 'seamless-immutable';

import { currentUserConstants } from 'vk-apps-frontend/constants';

const initialState = Immutable({
  user: null,
  vkId: null,
});

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case currentUserConstants.CURRENT_USER_SAVE_DATA: {
      const { user, vkId } = action;
      return Immutable.merge({
        user, vkId,
      });
    }

    default:
      return state;
  }
};

export default currentUserReducer;