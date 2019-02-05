import { currentUserConstants } from 'vk-apps-frontend/constants';

const currentUserSaveData = (user, vkId = null) => dispatch => {
  return dispatch({
    type: currentUserConstants.CURRENT_USER_SAVE_DATA,
    user: user,
    vkId: vkId,
  })
};

export const currentUserActions = {
  currentUserSaveData,
};