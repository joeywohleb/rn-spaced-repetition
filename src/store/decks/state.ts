import { Deck, Flashcard } from '../../models';

export interface DecksAppState {
    decks: Deck[];
    selectedDeck?: Deck;
    selectedFlashcard?: Flashcard;
}
