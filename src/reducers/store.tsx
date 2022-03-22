import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './index';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
    key: 'persist',
    storage,
    stateReconciler: hardSet,
    whitelist: ['auth', 'setting']
}

let rootReducer = reducers();
const persistedReducer = persistReducer(persistConfig, rootReducer)

let middlewares = null;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    middlewares = [thunkMiddleware, logger];
} else {
    middlewares = [thunkMiddleware];
}

export default function configureStore(initialState = null) {
    const store = createStore(persistedReducer, initialState || {},
        compose(applyMiddleware(...middlewares)));

    return store;
}