import { createHashHistory } from 'history';

const history = createHashHistory({
  hashType: 'noslash'
});

export default history;