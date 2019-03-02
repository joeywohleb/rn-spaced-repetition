import { rootReducer } from '../store/combine-reducers';

export * from './flashcard-set';
export * from './flashcard';

export type AppState = ReturnType<typeof rootReducer>;
