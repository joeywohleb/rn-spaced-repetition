import { FlashcardSet } from '../../models';

const ns: string = 'SETS';

export const setsActionTypes = {
    SET_FLASHCARD_SETS: `${ns}:SET_FLASHCARD_SETS`,
};

export interface SetFlashcardSetsAction {
    type: typeof setsActionTypes.SET_FLASHCARD_SETS;
    payload: FlashcardSet[];
}

export type SetsActionTypes = SetFlashcardSetsAction;
