import { locationConstants } from '../constants/location';

const initialState = {
  activeView: "start",
  activePanel: "",
  history: [],
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case locationConstants.LOCATION_CHANGE: {
      let { history } = state;
      const prevActiveView = state.activeView;
      const prevActivePanel = state.activePanel;
      history.push({
        activeView: prevActiveView,
        activePanel: prevActivePanel,
      });
      return {
        activeView: action.activeView,
        activePanel: action.activePanel,
        history,
      };
    }
    
    case locationConstants.LOCATION_GO_BACK: {
      let { history } = state;
      const { activePanel, activeView } = history.pop();
      return {
        activePanel,
        activeView,
        history,
      };
    }

    default:
      return state;
  }
};

export default locationReducer;