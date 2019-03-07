import { Deck, Flashcard } from '../../models';

const ns: string = 'SETS';

export const decksActionTypes = {
    SET_DECKS: `${ns}:SET_FLASHCARD_SETS`,
    SET_SELECTED_DECK: `${ns}:SET_SELECTED_DECK`,
    SET_SELECTED_FLASHCARD: `${ns}:SET_SELCTED_FLASHCARD`,
};

export interface SetDecksAction {
    type: typeof decksActionTypes.SET_DECKS;
    payload: Deck[];
}

export interface SetSelectedDeckAction {
    type: typeof decksActionTypes.SET_SELECTED_DECK;
    payload: Deck;
}

export interface SetSelectedFlashcardAction {
    type: typeof decksActionTypes.SET_SELECTED_FLASHCARD;
    payload: Flashcard;
}

export type DecksActionTypes = SetDecksAction | SetSelectedDeckAction | SetSelectedFlashcardAction;
