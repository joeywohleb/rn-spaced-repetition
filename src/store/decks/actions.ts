import { Dispatch } from 'redux';

import { SetDecksAction } from '.';
import defaultSets from '../../assets/json/default-set.json';
import { Deck, Flashcard } from '../../models';
import { NavigationService } from '../../services';
import { decksActionTypes as ActionTypes, SetSelectedDeckAction, SetSelectedFlashcardAction } from './action-types';

export const setDecks = (payload: Deck[]): SetDecksAction => ({
    type: ActionTypes.SET_DECKS,
    payload,
});

export const setSelectedDeck = (payload: Deck): SetSelectedDeckAction => ({
    type: ActionTypes.SET_SELECTED_DECK,
    payload,
});

export const setSelectedFlashcard = (payload: Flashcard): SetSelectedFlashcardAction => ({
    type: ActionTypes.SET_SELECTED_FLASHCARD,
    payload,
});

export const loadDecks = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(setDecks(defaultSets));
    };
};

export const selectDeck = (deck: Deck) => {
    return async (dispatch: Dispatch<any>) => {
        await dispatch(setSelectedDeck(deck));
        NavigationService.navigateTo('FlashcardView');
    };
};
