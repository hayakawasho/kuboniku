import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface worksState {
  currentIndex: number
}

const initialState: worksState = {
  currentIndex: 0
};

const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    setCurrentWorks: (state, action) => {
      const { payload } = action;
      state.currentIndex = payload;
    }
  }
});

export default worksSlice.reducer;

// Selectors
export const worksSelector = (state: RootState) => state.works;

// Actions
export const { setCurrentWorks } = worksSlice.actions;

// Thunks