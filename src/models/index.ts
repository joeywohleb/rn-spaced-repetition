import rootReducer from '../store/combine-reducers';

export type AppState = ReturnType<typeof rootReducer>;

export * from './deck';
export * from './flashcard';
export * from './review-history';
