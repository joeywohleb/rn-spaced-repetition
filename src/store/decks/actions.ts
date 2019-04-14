import moment from 'moment';
import { Dispatch } from 'redux';
import uuid from 'uuid';

import { SetDecksAction } from '.';
import defaultSets from '../../assets/json/default-set.json';
import { AppState, Deck, Flashcard, Proficiencies } from '../../models';
import { NavigationService, StorageService } from '../../services';
import {
    decksActionTypes as ActionTypes,
    SetInProgressFlashcardsAction,
    SetSelectedDeckAction,
    SetSelectedFlashcardAction,
    SetWorkingDeckAction,
    SetWorkingFlashcardAction,
    ToggleFlipAction,
} from './action-types';

export const setDecks = (payload: Deck[]): SetDecksAction => ({
    type: ActionTypes.SET_DECKS,
    payload,
});

export const setSelectedDeck = (payload: Deck): SetSelectedDeckAction => ({
    type: ActionTypes.SET_SELECTED_DECK,
    payload,
});

export const setWorkingDeck = (payload: Deck): SetWorkingDeckAction => ({
    type: ActionTypes.SET_WORKING_DECK,
    payload,
});

export const setSelectedFlashcard = (payload: Flashcard): SetSelectedFlashcardAction => ({
    type: ActionTypes.SET_SELECTED_FLASHCARD,
    payload,
});

export const setWorkingFlashcard = (payload: Flashcard): SetWorkingFlashcardAction => ({
    type: ActionTypes.SET_WORKING_FLASHCARD,
    payload,
});

export const setInProgressFlashcards = (payload: Flashcard[]): SetInProgressFlashcardsAction => ({
    type: ActionTypes.SET_IN_PROGRESS_FLASHCARDS,
    payload,
});

export const toggleFlip = (): ToggleFlipAction => ({
    type: ActionTypes.TOGGLE_FLIP,
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

export const createDeck = () => {
    return async (dispatch: Dispatch<any>) => {
        const deck: Deck = {
            id: uuid(),
            dateCreated: moment().toDate(),
            name: '',
            flashcards: [],
        };

        await dispatch(setWorkingDeck(deck));
        NavigationService.navigateTo('CreateDeck');
    };
};

export const saveDeck = () => {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        let { decks } = getState().decks;
        const { workingDeck } = getState().decks;

        decks = [...decks, workingDeck as Deck];

        await StorageService.set('decks', decks);
        await dispatch(setDecks(decks));
        NavigationService.goBack();
    };
};

const createDefaultDeck = async (): Promise<Deck[]> => {
    const decks: Deck[] = (defaultSets as Deck[]).map((d: Deck) => ({
        ...d,
        id: uuid(),
        dateCreated: moment().toDate(),
        flashcards: d.flashcards.map((f: Flashcard) => ({
            ...f,
            id: uuid(),
            dateCreated: moment().toDate(),
            history: [],
            proficiency: 0,
            nextViewDate: moment().toDate(),
        })),
    }));
    await StorageService.set('decks', decks);
    return decks;
};

export const selectDeck = (deck: Deck) => {
    return async (dispatch: Dispatch<any>) => {
        await dispatch(setSelectedDeck(deck));
        await dispatch(setInProgressFlashcards(filterReady(deck.flashcards)));
        NavigationService.navigateTo('FlashcardView');
    };
};

export const selectWorkingDeck = (deck: Deck) => {
    return async (dispatch: Dispatch<any>) => {
        await dispatch(setWorkingDeck(deck));
        NavigationService.navigateTo('ManageFlashcards');
    };
};

export const createFlashcard = () => {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        const { workingDeck } = getState().decks;

        const card: Flashcard = {
            id: uuid(),
            dateCreated: moment().toDate(),
            nextViewDate: moment().toDate(),
            name: '',
            front: '',
            back: '',
            order: ((workingDeck || { flashcards: [] }).flashcards || []).length,
            proficiency: 0,
            history: [],
        };

        await dispatch(setWorkingFlashcard(card));
        NavigationService.navigateTo('CreateFlashcard');
    };
};

export const editFlashcard = (flashcard: Flashcard) => {
    return async (dispatch: Dispatch<any>) => {
        await dispatch(setWorkingFlashcard(flashcard));

        NavigationService.navigateTo('CreateFlashcard');
    };
};

export const saveFlashcard = () => {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        let { workingDeck } = getState().decks;
        const { decks, workingFlashcard } = getState().decks;

        const flashcards: Flashcard[] = (workingDeck as Deck).flashcards;

        const index = flashcards.findIndex((f: Flashcard) => f.id === (workingFlashcard as Flashcard).id);

        workingDeck = {
            ...(workingDeck as Deck),
            flashcards:
                index === -1
                    ? [...flashcards, workingFlashcard as Flashcard]
                    : [
                          ...flashcards.slice(0, index),
                          { ...(workingFlashcard as Flashcard) },
                          ...flashcards.slice(index + 1),
                      ],
        };
        const deckIndex: number = decks.findIndex((d: Deck) => d.id === (workingDeck as Deck).id);

        const updatedDecks: Deck[] = [...decks.slice(0, deckIndex), { ...workingDeck }, ...decks.slice(deckIndex + 1)];

        await StorageService.set('decks', updatedDecks);
        await dispatch(setDecks(updatedDecks));
        await dispatch(setWorkingDeck(workingDeck));
        NavigationService.goBack();
    };
};

const filterReady = (flashcards: Flashcard[]) => {
    return [...flashcards.filter((f: Flashcard) => moment().isSameOrAfter(moment(f.nextViewDate)))];
};

export const saveResponse = (id: string, answeredCorrectly: boolean) => {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        const { selectedDeck, decks, inProgressFlashcards } = getState().decks;

        if (!selectedDeck) {
            return;
        }

        const cardIndex = selectedDeck.flashcards.findIndex((f: Flashcard) => f.id === id);

        const updatedFlashcard: Flashcard = updateProficiency(selectedDeck.flashcards[cardIndex], answeredCorrectly);

        if (updatedFlashcard.proficiency === 0) {
            inProgressFlashcards.push({ ...updatedFlashcard });
            dispatch(setInProgressFlashcards(inProgressFlashcards));
        }

        const updatedDeck: Deck = {
            ...selectedDeck,
            flashcards: [
                ...selectedDeck.flashcards.slice(0, cardIndex),
                { ...updatedFlashcard },
                ...selectedDeck.flashcards.slice(cardIndex + 1),
            ],
        };

        const deckIndex: number = decks.findIndex((d: Deck) => d.id === selectedDeck.id);

        const updatedDecks: Deck[] = [...decks.slice(0, deckIndex), { ...updatedDeck }, ...decks.slice(deckIndex + 1)];

        await StorageService.set('decks', updatedDecks);

        dispatch(setDecks(updatedDecks));
        dispatch(setSelectedDeck(updatedDeck));
    };
};

export const findNextViewDate = (deck?: Deck) => {
    if (!deck || deck.flashcards.length === 0) {
        return;
    }
    let nextViewDate: Date = deck.flashcards[0].nextViewDate;
    deck.flashcards.forEach((f: Flashcard) => {
        if (moment(nextViewDate).isAfter(f.nextViewDate) && moment(f.nextViewDate).isAfter(moment())) {
            nextViewDate = f.nextViewDate;
        }
    });
    return nextViewDate;
};

const updateProficiency = (flashcard: Flashcard, answeredCorrectly: boolean): Flashcard => {
    flashcard.history.push({ date: moment().toDate(), answeredCorrectly });

    const minLevel = Proficiencies[0].level;
    const maxLevel = Proficiencies[Proficiencies.length - 1].level;

    if (answeredCorrectly) {
        if (flashcard.proficiency < maxLevel) {
            flashcard.proficiency += 1;
        }
    } else {
        if (flashcard.proficiency > minLevel) {
            flashcard.proficiency -= 1;
        }
    }

    const { timeDuration, timeUnit } = Proficiencies[flashcard.proficiency];

    flashcard.nextViewDate = moment(flashcard.nextViewDate)
        .add(timeDuration, timeUnit)
        .toDate();

    return flashcard;
};
