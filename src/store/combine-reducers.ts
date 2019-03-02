import { combineReducers } from 'redux';

import { setsReducer as sets } from './sets';

const rootReducer = combineReducers({
    sets,
});

export default rootReducer;
