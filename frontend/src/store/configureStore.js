import { createStore, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import history from '../helpers/history';

import rootReducer from '../reducers';

const configureStore = preloadedState => createStore(
    connectRouter(history)(rootReducer),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunk,
        routerMiddleware(history)
    )
);

export default configureStore;