import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TierResult } from 'detect-gpu';

interface IAppState {
  domReady: boolean;
  gpuTier: TierResult;
  scrolling: boolean;
  location: Location;
  prevLocation: Location;
}

const initialState: IAppState = {
  domReady: false,
  gpuTier: null,
  scrolling: false,
  location: null,
  prevLocation: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    DOM_READY: state => {
      state.domReady = true;
    },

    SET_GPU_TIER: (state, action) => {
      const { payload } = action;
      state.gpuTier = payload;
    },

    SET_SCROLLING: (state, action) => {
      const { payload } = action;
      state.scrolling = payload;
    },

    SET_LOCATION: (state, action: PayloadAction<Location>) => {
      const { payload } = action;
      state.location = payload;
    },

    SET_PREV_LOCATION: (state, action: PayloadAction<Location>) => {
      const { payload } = action;
      state.prevLocation = payload;
    },
  },
});

export default appSlice.reducer;

// Selectors
export const appSelector = (state: RootState) => state.app;

// Actions
export const {
  DOM_READY,
  SET_SCROLLING,
  SET_GPU_TIER,
  SET_LOCATION,
  SET_PREV_LOCATION,
} = appSlice.actions;
