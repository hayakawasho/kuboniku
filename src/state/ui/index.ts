import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IUIState {
  location: Location
  prevLocation: Location
  menuOpen: boolean
  themeColor: string
}

const initialState: IUIState = {
  location: null,
  prevLocation: null,
  menuOpen: false,
  themeColor: '#1793a9',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    SET_LOCATION: (state, action: PayloadAction<Location>) => {
      const { payload } = action
      state.location = payload
    },

    SET_PREV_LOCATION: (state, action: PayloadAction<Location>) => {
      const { payload } = action
      state.prevLocation = payload
    },

    SET_THEME_COLOR: (state, action) => {
      const { payload } = action
      state.themeColor = payload
    },
  },
})

export default uiSlice.reducer

// Selectors
export const uiSelector = (state: RootState) => state.ui

// Actions
export const {
  SET_THEME_COLOR,
  SET_LOCATION,
  SET_PREV_LOCATION,
} = uiSlice.actions
