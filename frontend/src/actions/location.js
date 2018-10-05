import { locationConstants } from '../constants/location';

const changeLocation = (activeView, activePanel = "") => (dispatch) => {
  dispatch({
    type: locationConstants.LOCATION_CHANGE,
    activeView,
    activePanel,
  })
};

const goBack = () => dispatch => {
  dispatch({
    type: locationConstants.LOCATION_GO_BACK,
  });
};

export const locationActions= {
  changeLocation, goBack,
};