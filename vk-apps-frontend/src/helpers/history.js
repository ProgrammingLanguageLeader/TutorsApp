import { createHashHistory } from 'history';

const history = createHashHistory({
  hashType: 'slash'
});

let localHistoryLength = 0;

history.listen((location, action) => {
  if (action === 'PUSH') {
    localHistoryLength++;
  }
  else if (action === 'POP') {
    localHistoryLength--;
  }
});

export const getLocalHistoryLength = () => localHistoryLength;

export default history;