import { Dispatch } from 'redux';
import uuid from 'uuid';

import { SetDecksAction } from '.';
import defaultSets from '../../assets/json/default-set.json';
import { Deck, Flashcard } from '../../models';
import { NavigationService, StorageService } from '../../services';
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
        await StorageService.remove('decks');
        let decks: Deck[] = await StorageService.get<Deck>('decks');

        if (decks.length === 0) {
            decks = await createDefaultDeck();
        }

        dispatch(setDecks(decks));
    };
};

const createDefaultDeck = async (): Promise<Deck[]> => {
    const decks: Deck[] = (defaultSets as Deck[]).map((d: Deck) => ({
        ...d,
        id: uuid(),
        dateCreated: new Date(),
        flashcards: d.flashcards.map((f: Flashcard) => ({ ...f, id: uuid(), dateCreated: new Date(), history: [] })),
    }));
    await StorageService.set('decks', decks);
    return decks;
};

export const selectDeck = (deck: Deck) => {
    return async (dispatch: Dispatch<any>) => {
        await dispatch(setSelectedDeck(deck));
        NavigationService.navigateTo('FlashcardView');
    };
};
