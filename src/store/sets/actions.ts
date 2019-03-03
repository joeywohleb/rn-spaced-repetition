import { Dispatch } from 'redux';

import { SetFlashcardSetsAction } from '.';
import defaultSets from '../../assets/json/default-set.json';
import { FlashcardSet } from '../../models';
import { setsActionTypes as ActionTypes } from './action-types';

export const setFlashcardSets = (payload: FlashcardSet[]): SetFlashcardSetsAction => ({
    type: ActionTypes.SET_FLASHCARD_SETS,
    payload,
});

export const loadFlashcardSets = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(setFlashcardSets(defaultSets));
    };
};
