import rootReducer from '../store/combine-reducers';

export * from './deck';
export * from './flashcard';

export type AppState = ReturnType<typeof rootReducer>;
