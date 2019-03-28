import { createMemoryHistory } from 'history';

class HistoryAdapter {
  constructor() {
    if (HistoryAdapter.instance) {
      throw 'HistoryAdapter instance already exists. Use getInstance() instead';
    }
    this.history = createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0,
      getUserConfirmation: (message, callback) => {
        callback(window.confirm(message))
      }
    });

    this.getHistory = this.getHistory.bind(this);
    this.getLastAction = this.getLastAction.bind(this);
    this.getHistoryLength = this.getHistoryLength.bind(this);
    this.push = this.push.bind(this);
    this.goBack = this.goBack.bind(this);
    this.replace = this.replace.bind(this);
    this.pushWithFlush = this.pushWithFlush.bind(this);
    this.canGoBack = this.canGoBack.bind(this);
  }

  static getInstance() {
    if (!HistoryAdapter.instance) {
      HistoryAdapter.instance = new HistoryAdapter();
    }
    return HistoryAdapter.instance;
  }

  push(path) {
    this.history.push(path);
  }

  goBack() {
    this.history.goBack();
  }

  replace(path) {
    this.history.replace(path);
  }

  pushWithFlush(path) {
    const lastLocation = this.history.entries.slice(-1)[0];
    if (lastLocation === path) {
      return;
    }
    this.push(path);
    this.history.entries = this.history.entries.slice(-1);
    this.history.index = 0;
  }

  getHistory() {
    return this.history;
  }

  getLastAction() {
    return this.history.action;
  }

  getHistoryLength() {
    return this.history.entries.length;
  }

  canGoBack() {
    return this.history.canGo(-1);
  }
}

export default HistoryAdapter;