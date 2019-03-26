import { createHashHistory } from 'history';

class HistoryAdapter {
  constructor() {
    if (HistoryAdapter.instance) {
      throw 'HistoryAdapter instance already exists. Use getInstance() instead';
    }
    this.history = createHashHistory({
      hashType: 'slash'
    });
    this.historyLength = 0;
    this.lastAction = '';

    this.initListener.call(this);
    this.getHistory = this.getHistory.bind(this);
    this.getLastAction = this.getLastAction.bind(this);
    this.getLocalHistoryLength = this.getLocalHistoryLength.bind(this);
  }

  static getInstance() {
    if (!HistoryAdapter.instance) {
      HistoryAdapter.instance = new HistoryAdapter();
    }
    return HistoryAdapter.instance;
  }

  initListener() {
    this.history.listen((location, action) => {
      this.lastAction = action;
      if (action === 'PUSH') {
        this.historyLength++;
      }
      else if (action === 'POP') {
        this.historyLength--;
      }
    });
  }

  getHistory() {
    return this.history;
  }

  getLastAction() {
    return this.lastAction;
  }

  getLocalHistoryLength() {
    return this.historyLength;
  }
}

export default HistoryAdapter;