import { Flashcard } from '.';

export interface Deck {
    name: string;
    dateCreated?: Date;
    flashcards: Flashcard[];
}
