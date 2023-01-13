import { createSlice } from '@reduxjs/toolkit';

import { ThemeModes } from '../constants';

export interface ThemeState {
  palette: {
    mode: keyof typeof ThemeModes;
  };
}

const initialState: ThemeState = {
  palette: {
    mode: ThemeModes.light
  }
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.palette.mode === ThemeModes.light) {
        // eslint-disable-next-line no-param-reassign
        state.palette.mode = ThemeModes.dark;
      } else {
        // eslint-disable-next-line no-param-reassign
        state.palette.mode = ThemeModes.light;
      }
    }
  }
});

export const { toggleTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
