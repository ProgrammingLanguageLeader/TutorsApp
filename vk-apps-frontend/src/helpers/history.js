import { createHashHistory } from 'history';

const history = createHashHistory({
  hashType: 'slash'
});

let localHistoryLength = 0;
let lastAction = '';

history.listen((location, action) => {
  lastAction = action;
  if (action === 'PUSH') {
    localHistoryLength++;
  }
  else if (action === 'POP') {
    localHistoryLength--;
  }
});

export const getLocalHistoryLength = () => localHistoryLength;

export const getLastAction = () => lastAction;

export default history;