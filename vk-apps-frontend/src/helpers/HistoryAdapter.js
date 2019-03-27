import { createHashHistory } from 'history';

class HistoryAdapter {
  constructor() {
    if (HistoryAdapter.instance) {
      throw 'HistoryAdapter instance already exists. Use getInstance() instead';
    }
    this.history = createHashHistory({
      hashType: 'slash'
    });
    this.lastAction = '';
    this.localHistory = [this.history.location.pathname];

    this.getHistory = this.getHistory.bind(this);
    this.getLastAction = this.getLastAction.bind(this);
    this.getLocalHistoryLength = this.getLocalHistoryLength.bind(this);
    this.push = this.push.bind(this);
    this.goBack = this.goBack.bind(this);
    this.replace = this.replace.bind(this);
    this.pushWithFlush = this.pushWithFlush.bind(this);
  }

  static getInstance() {
    if (!HistoryAdapter.instance) {
      HistoryAdapter.instance = new HistoryAdapter();
    }
    return HistoryAdapter.instance;
  }

  push(path) {
    this.localHistory.push(path);
    this.history.push(path);
    this.lastAction = 'PUSH';
  }

  goBack() {
    this.localHistory.pop();
    this.history.goBack();
    this.lastAction = 'POP';
  }

  replace(path) {
    this.lastAction = 'REPLACE';
    this.localHistory.pop();
    this.history.replace(path);
    this.localHistory.push(path);
  }

  pushWithFlush(path) {
    const lastLocation = this.localHistory.slice(-1)[0];
    if (lastLocation === path) {
      return;
    }
    const backLength = this.localHistory.length - 1;
    if (backLength > 0) {
      this.history.go(-backLength);
      setTimeout(() => {
        this.history.replace(path);
      }, 0);
    }
    this.history.replace(path);
    this.localHistory = [path];
  }

  getHistory() {
    return this.history;
  }

  getLastAction() {
    return this.lastAction;
  }

  getLocalHistoryLength() {
    return this.localHistory.length;
  }
}

export default HistoryAdapter;