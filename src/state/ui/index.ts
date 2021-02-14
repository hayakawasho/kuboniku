import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IUIState {
  menuOpen: boolean;
  menuAnimating: boolean;
  uiColor: string;
}

const initialState: IUIState = {
  menuOpen: false,
  menuAnimating: false,
  uiColor: '#1793a9',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    SET_UI_COLOR: (state, action) => {
      const { payload } = action;
      state.uiColor = payload;
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
  OPEN_MENU,
  CLOSE_MENU,
  SET_MENU_ANIMATING,
} = uiSlice.actions;
