import { locationConstants } from '../constants/location';

const initialState = {
  activeView: "start",
  activePanel: "",
  extraParams: {},
  history: [],
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case locationConstants.LOCATION_CHANGE: {
      let { history } = state;
      const prevActiveView = state.activeView;
      const prevActivePanel = state.activePanel;
      const prevExtraParams = state.extraParams;
      history.push({
        activeView: prevActiveView,
        activePanel: prevActivePanel,
        extraParams: prevExtraParams,
      });
      return {
        activeView: action.activeView,
        activePanel: action.activePanel,
        extraParams: action.extraParams,
        history,
      };
    }
    
    case locationConstants.LOCATION_GO_BACK: {
      let { history } = state;
      const { activePanel, activeView, extraParams } = history.pop();
      return {
        activePanel,
        activeView,
        extraParams,
        history,
      };
    }

    default:
      return state;
  }
};

export default locationReducer;