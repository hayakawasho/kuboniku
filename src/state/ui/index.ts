import { createSlice } from '@reduxjs/toolkit'
// import store from '../store';
import { RootState } from '../store'

interface IUIState {
  menuOpen: boolean
  scrolling: boolean
}
const initialState: IUIState = {
  menuOpen: false,
  scrolling: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    SET_SCROLLING: (state, action) => {
      const { payload } = action
      state.scrolling = payload
    },
  },
})

export default uiSlice.reducer

// Selectors
export const uiSelector = (state: RootState) => state.ui

// Actions
export const { SET_SCROLLING } = uiSlice.actions
