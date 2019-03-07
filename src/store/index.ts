import { applyMiddleware, compose, createStore, Middleware, Store, StoreEnhancer } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import { AppState } from '../models';
import rootReducer from './combine-reducers';

const middlewares: Middleware[] = [];

if (__DEV__) {
    middlewares.push(logger);
}

middlewares.push(thunk);

const enhancer: StoreEnhancer = compose(applyMiddleware(...middlewares));

export default function configureStore() {
    const store: Store<AppState> = createStore(rootReducer, enhancer);
    return store;
}
