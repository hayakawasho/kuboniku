import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TierResult } from 'detect-gpu';
import { createSelector } from 'reselect';
import { norm } from '~/foundation/utils/math';

interface IAppState {
  domReady: boolean;
  gpuTier: TierResult;
  scrolling: boolean;
  docHeight: number;
  windowHeight: number;
  location: Location;
  prevLocation: Location;
}

const initialState: IAppState = {
  domReady: false,
  gpuTier: null,
  scrolling: false,
  docHeight: 0,
  windowHeight: 0,
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

    SET_WINDOW_HEIGHT: (state, action) => {
      const { payload } = action;
      state.windowHeight = payload;
    },

    SET_DOC_HEIGHT: (state, action) => {
      const { payload } = action;
      state.docHeight = payload;
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

/*
  @return 0 ~ 1
*/
export const scrollBufferSelector = createSelector(
  (state: RootState) => state.app.docHeight,
  (state: RootState) => state.app.windowHeight,
  (docHeight, windowHeight) => {
    return norm(windowHeight, 0, docHeight);
  }
);

// Actions
export const {
  DOM_READY,
  SET_SCROLLING,
  SET_GPU_TIER,
  SET_WINDOW_HEIGHT,
  SET_DOC_HEIGHT,
  SET_LOCATION,
  SET_PREV_LOCATION,
} = appSlice.actions;
