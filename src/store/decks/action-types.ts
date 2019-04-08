import { Deck, Flashcard } from '../../models';

const ns: string = 'DECKS';

export const decksActionTypes = {
    SET_DECKS: `${ns}:SET_FLASHCARD_SETS`,
    SET_SELECTED_DECK: `${ns}:SET_SELECTED_DECK`,
    SET_WORKING_DECK: `${ns}:SET_WORKING_DECK`,
    SET_SELECTED_FLASHCARD: `${ns}:SET_SELCTED_FLASHCARD`,
    SET_WORKING_FLASHCARD: `${ns}:SET_WORKING_FLASHCARD`,
    SET_IN_PROGRESS_FLASHCARDS: `${ns}:SET_IN_PROGRESS_FLASHCARDS`,
    TOGGLE_FLIP: `${ns}:TOGGLE_FLIP`,
};

export interface SetDecksAction {
    type: typeof decksActionTypes.SET_DECKS;
    payload: Deck[];
}

export interface SetSelectedDeckAction {
    type: typeof decksActionTypes.SET_SELECTED_DECK;
    payload: Deck;
}

export interface SetWorkingDeckAction {
    type: typeof decksActionTypes.SET_WORKING_DECK;
    payload: Deck;
}

export interface SetSelectedFlashcardAction {
    type: typeof decksActionTypes.SET_SELECTED_FLASHCARD;
    payload: Flashcard;
}

export interface SetWorkingFlashcardAction {
    type: typeof decksActionTypes.SET_WORKING_FLASHCARD;
    payload: Flashcard;
}

export interface SetInProgressFlashcardsAction {
    type: typeof decksActionTypes.SET_IN_PROGRESS_FLASHCARDS;
    payload: Flashcard[];
}

export interface ToggleFlipAction {
    type: typeof decksActionTypes.TOGGLE_FLIP;
}

export type DecksActionTypes =
    | SetDecksAction
    | SetSelectedDeckAction
    | SetWorkingDeckAction
    | SetSelectedFlashcardAction
    | SetWorkingFlashcardAction
    | SetInProgressFlashcardsAction
    | ToggleFlipAction;
