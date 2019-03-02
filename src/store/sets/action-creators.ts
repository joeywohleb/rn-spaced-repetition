import { FlashcardSet } from '../../models';
import { setsActionTypes as ActionTypes } from './action-types';

export const setFlashcardSets = (sets: FlashcardSet[]) => {
    return {
        type: ActionTypes.SET_FLASHCARD_SETS,
        payload: sets,
    };
};
