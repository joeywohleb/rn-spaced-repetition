import { Deck, Flashcard } from '../../models';

const ns: string = 'DECKS';

export const decksActionTypes = {
    SET_DECKS: `${ns}:SET_FLASHCARD_SETS`,
    SET_SELECTED_DECK: `${ns}:SET_SELECTED_DECK`,
    SET_SELECTED_FLASHCARD: `${ns}:SET_SELCTED_FLASHCARD`,
    SET_IN_PROGRESS_FLASHCARDS: `${ns}:SET_IN_PROGRESS_FLASHCARDS`,
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

export interface SetInProgressFlashcardsAction {
    type: typeof decksActionTypes.SET_IN_PROGRESS_FLASHCARDS;
    payload: Flashcard[];
}

export type DecksActionTypes =
    | SetDecksAction
    | SetSelectedDeckAction
    | SetSelectedFlashcardAction
    | SetInProgressFlashcardsAction;
