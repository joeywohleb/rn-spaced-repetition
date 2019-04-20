import { Flashcard } from '.';

export interface Deck {
    id: string;
    name: string;
    dateCreated: Date;
    isActive: boolean;
    flashcards: Flashcard[];
}
