import { combineReducers } from 'redux';

import { setsReducer } from './sets';

const rootReducer = combineReducers({
    setsReducer,
});

export default rootReducer;
