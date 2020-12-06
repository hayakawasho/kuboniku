import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { TierResult } from 'detect-gpu'

interface IUIState {
  menuOpen: boolean
  scrolling: boolean
  color: string
  gpuTier: TierResult
}

const initialState: IUIState = {
  menuOpen: false,
  scrolling: false,
  color: '#1793a9',
  gpuTier: null,
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

    SET_GPU_TIER: (state, action) => {
      const { payload } = action
      state.gpuTier = payload
    },
  },
})

export default uiSlice.reducer

// Selectors
export const uiSelector = (state: RootState) => state.ui

// Actions
export const { SET_SCROLLING, SET_THEME_COLOR, SET_GPU_TIER } = uiSlice.actions
