import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './index';

const selectState = (state: RootState): RootState => state;

export const selectUser = createSelector(
  selectState,
  ({ auth: { user } }: RootState) => user
);

export const selectTheme = createSelector(
  selectState,
  ({ theme }: RootState) => theme
);

export const selectThemeMode = createSelector(
  selectState,
  ({ theme }: RootState) => theme.palette.mode
);

export const selectLoading = createSelector(
  selectState,
  ({ pictures: { loading } }: RootState) => loading
);

export const selectPictures = createSelector(
  selectState,
  ({ pictures: { pictures } }: RootState) => pictures
);

export const selectAuthors = createSelector(
  selectState,
  ({ pictures: { authors } }: RootState) => authors
);
