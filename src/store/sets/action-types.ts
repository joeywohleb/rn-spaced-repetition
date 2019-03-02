import { FlashcardSet } from '../../models';

const ns: string = 'SETS';

export const setsActionTypes = {
    LOAD_FLASHCARD_SETS: `${ns}:LOAD_FLASHCARD_SETS`,
    SET_FLASHCARD_SETS: `${ns}:SET_FLASHCARD_SETS`,
};

interface LoadFlashcardSetsAction {
    type: typeof setsActionTypes.LOAD_FLASHCARD_SETS;
    payload: FlashcardSet[];
}

interface SetFlashcardSetsAction {
    type: typeof setsActionTypes.LOAD_FLASHCARD_SETS;
    payload: FlashcardSet[];
}

export type SetsActionTypes = LoadFlashcardSetsAction | SetFlashcardSetsAction;
