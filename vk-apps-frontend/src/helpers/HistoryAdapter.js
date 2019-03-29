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
          if (pathname === this.localHistory[this.localHistoryIndex])
            break;
          this.localHistoryIndex++;
          if (this.localHistoryIndex !== this.localHistory.length) {
            this.localHistory = this.localHistory.slice(0, this.localHistoryIndex);
          }
          this.localHistory.push(pathname);
          break;

        case 'POP':
          if (pathname === this.localHistory[this.localHistoryIndex - 1]) {
            this.localHistoryIndex--;
          }
          else if (pathname === this.localHistory[this.localHistoryIndex + 1]) {
            this.localHistoryIndex++;
          }
          break;

        case 'REPLACE':
          this.localHistory[this.localHistoryIndex] = pathname;
          this.localHistory = this.localHistory.slice(0, this.localHistoryIndex + 1);
          break;

        default:
          console.log(`Unknown type of action: ${action}`);
          break;
      }
      this.lastAction = action;
    });
    this.lastAction = '';
    this.localHistory = [this.history.location.pathname];
    this.localHistoryIndex = 0;

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
    return this.localHistoryIndex > 0;
  }
}

export default HistoryAdapter;