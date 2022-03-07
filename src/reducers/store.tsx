import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './index';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
    key: 'persist',
    storage,
    stateReconciler: hardSet,
    whitelist: ['auth']
}

const history = createBrowserHistory();
let rootReducer = reducers(history)
const persistedReducer = persistReducer(persistConfig, rootReducer)

const routeMiddleware = routerMiddleware(history);

let middlewares = null;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    middlewares = [routeMiddleware, thunkMiddleware, logger];
} else {
    middlewares = [routeMiddleware, thunkMiddleware];
}

export default function configureStore(initialState = null) {
    const store = createStore(persistedReducer, initialState || {},
        compose(applyMiddleware(...middlewares)));

    return store;
}

export { history };