import { locationConstants } from '../constants/location';

const changeLocation = (activeView, activePanel = "", extraParams = {}) => (dispatch) => {
  dispatch({
    type: locationConstants.LOCATION_CHANGE,
    activeView,
    activePanel,
    extraParams,
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