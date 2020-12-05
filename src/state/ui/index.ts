import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IUIState {
  menuOpen: boolean
  scrolling: boolean
  color: string
}

const initialState: IUIState = {
  menuOpen: false,
  scrolling: false,
  color: '#1793a9',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    SET_SCROLLING: (state, action) => {
      const { payload } = action
      state.scrolling = payload
    },

    SET_THEME_COLOR: (state, action) => {
      const { payload } = action
      state.color = payload
    },
  },
})

export default uiSlice.reducer

// Selectors
export const uiSelector = (state: RootState) => state.ui

// Actions
export const { SET_SCROLLING, SET_THEME_COLOR } = uiSlice.actions
