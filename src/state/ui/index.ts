import { createSlice } from '@reduxjs/toolkit';
// import store from '../store';
import { RootState } from '../store';

interface UIState {
  domLoaded: boolean
  menuOpen: boolean
  scrolling: boolean
}

const initialState: UIState = {
  domLoaded: false,
  menuOpen: false,
  scrolling: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    domLoaded: state => {
      state.domLoaded = true
    },

    scrolled: (state, action) => {
      const { payload } = action;
      state.scrolling = payload;
    },
  }
});

export default uiSlice.reducer;

// Selectors
export const uiSelector = (state: RootState) => state.ui;

// Actions
export const { domLoaded, scrolled } = uiSlice.actions;

// Thunks
