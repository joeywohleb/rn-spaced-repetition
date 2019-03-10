import { ReviewHistory } from './';

export interface Flashcard {
    name: string;
    front: string;
    back: string;
    order: number;
    dateCreated?: Date;
    history?: ReviewHistory[];
}
