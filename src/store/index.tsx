import { applyMiddleware, compose, createStore } from 'redux';
import { logger } from 'redux-logger';

import rootReducer from './combine-reducers';

const middlewares = [];
if (__DEV__) {
    middlewares.push(logger);
}

const enhancer = compose(applyMiddleware(...middlewares));

export default function configureStore() {
    const store = createStore(rootReducer, enhancer);
    return store;
}
