import { Dispatch } from 'redux';
import defaultSets from '../../assets/json/default-set.json';
import { FlashcardSet } from '../../models';
import { setsActionTypes as ActionTypes } from './action-types';

export const setFlashcardSets = (sets: FlashcardSet[]) => {
    return {
        type: ActionTypes.SET_FLASHCARD_SETS,
        payload: sets,
    };
};

export const loadFlashcardSets = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(setFlashcardSets(defaultSets));
    };
};
