import { ReviewHistory } from './';

export interface Flashcard {
    id: string;
    name: string;
    front: string;
    back: string;
    order: number;
    dateCreated: Date;
    nextViewDate: Date;
    proficiency: number;
    history: ReviewHistory[];
}
