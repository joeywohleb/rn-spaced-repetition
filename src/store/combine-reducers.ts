import { combineReducers } from 'redux';

import { decksReducer as decks } from './decks';

export default combineReducers({
    decks,
});
