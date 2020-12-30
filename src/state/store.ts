import { configureStore, combineReducers } from '@reduxjs/toolkit';
import uiReducer from './ui';
import appReducer from './app';

const rootReducer = combineReducers({
  ui: uiReducer,
  app: appReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;

export default store;
