import { SetsActionTypes, setsActionTypes as ActionTypes } from './action-types';
import { SetsAppState } from './state';

const initialState: SetsAppState = {
    sets: [],
};

export const setsReducer = (state = initialState, action: SetsActionTypes): SetsAppState => {
    switch (action.type) {
        case ActionTypes.SET_FLASHCARD_SETS:
            return {
                sets: [...action.payload],
            };
        default:
            return state;
    }
};
