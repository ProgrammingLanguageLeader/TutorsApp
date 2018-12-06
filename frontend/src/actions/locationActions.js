import { locationConstants } from '../constants';

const changeLocation = (activeView, activePanel = "", params = {}) => (dispatch) => {
  dispatch({
    type: locationConstants.LOCATION_CHANGE,
    activeView,
    activePanel,
    params,
  })
};

const goBack = () => dispatch => {
  dispatch({
    type: locationConstants.LOCATION_GO_BACK,
  });
};

export const locationActions = {
  changeLocation, goBack,
};