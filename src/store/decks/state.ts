import { Deck, Flashcard } from '../../models';

export interface DecksAppState {
    decks: Deck[];
    selectedDeck?: Deck;
    workingDeck?: Deck;
    selectedFlashcard?: Flashcard;
    inProgressFlashcards: Flashcard[];
    flip: boolean;
}
