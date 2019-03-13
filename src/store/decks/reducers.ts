import { decksActionTypes as ActionTypes } from './action-types';
import { DecksAppState } from './state';

const initialState: DecksAppState = {
    decks: [],
    selectedDeck: undefined,
    selectedFlashcard: undefined,
    inProgressFlashcards: [],
};

export const decksReducer = (state: DecksAppState = initialState, action: any): DecksAppState => {
    switch (action.type) {
        case ActionTypes.SET_DECKS:
            return {
                ...state,
                decks: [...action.payload],
            };
        case ActionTypes.SET_SELECTED_DECK:
            return {
                ...state,
                selectedDeck: {
                    ...action.payload,
                },
            };
        case ActionTypes.SET_SELECTED_FLASHCARD:
            return {
                ...state,
                selectedFlashcard: {
                    ...action.payload,
                },
            };
        case ActionTypes.SET_IN_PROGRESS_FLASHCARDS:
            return {
                ...state,
                inProgressFlashcards: [...action.payload],
            };
        default:
            return state;
    }
};
