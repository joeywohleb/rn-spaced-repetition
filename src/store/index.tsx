import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './combine-reducers';

const middlewares: Middleware[] = [];
if (__DEV__) {
    middlewares.push(logger);
}

middlewares.push(thunk);

const enhancer = compose(applyMiddleware(...middlewares));

export default function configureStore() {
    const store = createStore(rootReducer, enhancer);
    return store;
}
