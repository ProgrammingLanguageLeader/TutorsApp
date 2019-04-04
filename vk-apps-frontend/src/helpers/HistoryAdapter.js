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
          const pathnameIndex = this.localHistory.findIndex(historyElement => historyElement === pathname);
          if (pathnameIndex >= 0) {
            this.localHistoryIndex = pathnameIndex;
            this.localHistory = this.localHistory.slice(0, pathnameIndex + 1);
            this.lastAction = 'BACK';
          }
          else {
            this.localHistory.push(pathname);
            this.localHistoryIndex++;
            this.lastAction = 'FORWARD';
          }
          break;

        case 'POP':
          if (pathname === this.localHistory[this.localHistoryIndex - 1]) {
            this.localHistoryIndex--;
            this.lastAction = 'BACK';
          }
          else if (pathname === this.localHistory[this.localHistoryIndex + 1]) {
            this.localHistoryIndex++;
            this.lastAction = 'FORWARD';
          }
          break;

        case 'REPLACE':
          this.localHistory[this.localHistoryIndex] = pathname;
          this.lastAction = this.localHistory[this.localHistoryIndex + 1] ? 'BACK' : 'FORWARD';
          this.localHistory = this.localHistory.slice(0, this.localHistoryIndex + 1);
          break;

        default:
          console.log(`Unknown type of action: ${action}`);
          this.lastAction = '';
          break;
      }
    });
    this.localHistory = [this.history.location.pathname];
    this.localHistoryIndex = 0;
  }

  static getInstance() {
    if (!HistoryAdapter.instance) {
      HistoryAdapter.instance = new HistoryAdapter();
    }
    return HistoryAdapter.instance;
  }

  push(pathname) {
    this.history.push(pathname);
  }

  goBack() {
    if (!this.canGoBack()) {
      this.history.goBack();
    }
    else {
      this.history.replace(this.localHistory[--this.localHistoryIndex]);
    }
  }

  goForward() {
    this.history.goForward()
  }

  replace(path) {
    this.history.replace(path);
  }

  go(n) {
    this.history.go(n);
  }

  canGoBack() {
    return this.localHistoryIndex > 0;
  }

  listen(callback) {
    return this.history.listen(callback);
  }

  block(callback) {
    return this.history.block(callback);
  }

  get location() {
    return this.history.location;
  }

  get length() {
    return this.history.length;
  }

  get action() {
    return this.history.action;
  }
}

export default HistoryAdapter;