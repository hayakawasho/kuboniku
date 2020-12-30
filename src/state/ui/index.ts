import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IUIState {
  location: Location;
  prevLocation: Location;
  menuOpen: boolean;
  menuAnimating: boolean;
  UIColor: string;
}

const initialState: IUIState = {
  location: null,
  prevLocation: null,
  menuOpen: false,
  menuAnimating: false,
  UIColor: '#1793a9',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    SET_LOCATION: (state, action: PayloadAction<Location>) => {
      const { payload } = action;
      state.location = payload;
    },

    SET_PREV_LOCATION: (state, action: PayloadAction<Location>) => {
      const { payload } = action;
      state.prevLocation = payload;
    },

    SET_UI_COLOR: (state, action) => {
      const { payload } = action;
      state.UIColor = payload;
    },

    OPEN_MENU: state => {
      state.menuOpen = true;
    },

    CLOSE_MENU: state => {
      state.menuOpen = false;
    },

    SET_MENU_ANIMATING: (state, action) => {
      const { payload } = action;
      state.menuAnimating = payload;
    },
  },
});

export default uiSlice.reducer;

// Selectors
export const uiSelector = (state: RootState) => state.ui;

// Actions
export const {
  SET_UI_COLOR,
  SET_LOCATION,
  SET_PREV_LOCATION,
  OPEN_MENU,
  CLOSE_MENU,
  SET_MENU_ANIMATING,
} = uiSlice.actions;
