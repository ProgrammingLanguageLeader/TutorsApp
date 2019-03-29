import { createHashHistory } from 'history';

class HistoryAdapter {
  constructor() {
    if (HistoryAdapter.instance) {
      throw 'HistoryAdapter instance already exists. Use getInstance() instead';
    }
    this.history = createHashHistory({
      hashType: 'noslash'
    });
    this.history.listen((location, action) => {
      const { pathname } = location;
      switch (action) {
        case 'PUSH':
          this.localHistory.push(pathname);
          break;

        case 'POP':
          if (pathname === this.localHistory.slice(-2, -1)[0]) {
            this.localHistory.pop();
          }
          else {
            // TODO: forward button handling
            // now it has problems with blocking history
            // this.localHistory.push(pathname);
          }
          break;

        case 'REPLACE':
          this.localHistory.pop();
          this.localHistory.push(pathname);
          break;

        default:
          console.log(`Unknown type of action: ${action}`);
          break;
      }
      this.lastAction = action;
    });
    this.lastAction = '';
    this.localHistory = [this.history.location.pathname];

    this.getHistory = this.getHistory.bind(this);
    this.getLastAction = this.getLastAction.bind(this);
    this.getLocalHistoryLength = this.getLocalHistoryLength.bind(this);
    this.push = this.push.bind(this);
    this.goBack = this.goBack.bind(this);
    this.replace = this.replace.bind(this);
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

  getHistory() {
    return this.history;
  }

  getLastAction() {
    return this.lastAction;
  }

  getLocalHistoryLength() {
    return this.localHistory.length;
  }

  canGoBack() {
    return this.localHistory.length > 1;
  }
}

export default HistoryAdapter;