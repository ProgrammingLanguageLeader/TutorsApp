import { locationConstants } from '../constants/locationConstants';

const HISTORY_MAX_SIZE = 32;

const initialState = {
  activeView: "start",
  activePanel: "",
  params: {},
  history: [],
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case locationConstants.LOCATION_CHANGE: {
      let { history } = state;
      const prevActiveView = state.activeView;
      const prevActivePanel = state.activePanel;
      const prevParams = state.params;
      history.push({
        activeView: prevActiveView,
        activePanel: prevActivePanel,
        params: prevParams,
      });
      if (history.length > HISTORY_MAX_SIZE) {
        history = history.slice(1, HISTORY_MAX_SIZE + 1);
      }
      return {
        activeView: action.activeView,
        activePanel: action.activePanel,
        params: action.params,
        history,
      };
    }
    
    case locationConstants.LOCATION_GO_BACK: {
      let { history } = state;
      const { activePanel, activeView, params } = history.pop();
      return {
        activePanel,
        activeView,
        params,
        history,
      };
    }

    default:
      return state;
  }
};

export default locationReducer;