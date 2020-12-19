import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { TierResult } from 'detect-gpu'

interface IUIState {
  domReady: boolean
  gpuTier: TierResult
  location: Location
  prevLocation: Location
  menuOpen: boolean
  scrolling: boolean
  themeColor: string
}

const initialState: IUIState = {
  domReady: false,
  gpuTier: null,
  location: null,
  prevLocation: null,
  menuOpen: false,
  scrolling: false,
  themeColor: '#1793a9',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    DOM_READY: state => {
      state.domReady = true
    },

    SET_GPU_TIER: (state, action) => {
      const { payload } = action
      state.gpuTier = payload
    },

    SET_LOCATION: (state, action: PayloadAction<Location>) => {
      const { payload } = action
      state.location = payload
    },

    SET_PREV_LOCATION: (state, action: PayloadAction<Location>) => {
      const { payload } = action
      state.prevLocation = payload
    },

    SET_SCROLLING: (state, action) => {
      const { payload } = action
      state.scrolling = payload
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
  DOM_READY,
  SET_SCROLLING,
  SET_THEME_COLOR,
  SET_GPU_TIER,
  SET_LOCATION,
  SET_PREV_LOCATION,
} = uiSlice.actions
