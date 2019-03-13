import rootReducer from '../store/combine-reducers';

export type AppState = ReturnType<typeof rootReducer>;

export * from './deck';
export * from './flashcard';
export * from './proficiency';
export * from './review-history';
