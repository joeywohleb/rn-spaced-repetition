import { Dispatch } from 'redux';
import uuid from 'uuid';

import { SetDecksAction } from '.';
import defaultSets from '../../assets/json/default-set.json';
import { AppState, Deck, Flashcard } from '../../models';
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
        flashcards: d.flashcards.map((f: Flashcard) => ({
            ...f,
            id: uuid(),
            dateCreated: new Date(),
            history: [],
            proficiency: 0,
            nextViewDate: new Date(),
        })),
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

export const saveResponse = (id: string, answeredCorrectly: boolean) => {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        const { selectedDeck, decks } = getState().decks;

        if (!selectedDeck) {
            return;
        }

        const cardIndex = selectedDeck.flashcards.findIndex((f: Flashcard) => f.id === id);

        selectedDeck.flashcards[cardIndex].history.push({ date: new Date(), answeredCorrectly });

        const deckIndex: number = decks.findIndex((d: Deck) => d.id === selectedDeck.id);

        const updatedDecks: Deck[] = [...decks.slice(0, deckIndex), { ...selectedDeck }, ...decks.slice(deckIndex + 1)];

        await StorageService.set('decks', updatedDecks);

        dispatch(setDecks(updatedDecks));
    };
};
