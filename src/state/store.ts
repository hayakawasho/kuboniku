import { configureStore, combineReducers } from '@reduxjs/toolkit'
import uiReducer from './ui'

const rootReducer = combineReducers({
  ui: uiReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type Dispatch = typeof store.dispatch

export default store
