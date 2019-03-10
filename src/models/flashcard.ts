import { ReviewHistory } from './';

export interface Flashcard {
    id: string;
    name: string;
    front: string;
    back: string;
    order: number;
    dateCreated: Date;
    history: ReviewHistory[];
}
