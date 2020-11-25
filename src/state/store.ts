import { configureStore, combineReducers, Action } from '@reduxjs/toolkit';
import uiReducer from './ui';
import worksReducer from './works';

const rootReducer = combineReducers({
  ui: uiReducer,
  works: worksReducer,
});

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;

export default store;
