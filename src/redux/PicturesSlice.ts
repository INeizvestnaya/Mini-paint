import { createSlice } from '@reduxjs/toolkit';

import { Picture } from '../types';

interface PicturesState {
  pictures: Picture[];
  authors: string[];
  loading: boolean;
}

const initialState: PicturesState = {
  pictures: [],
  authors: [],
  loading: false
};

const PicturesSlice = createSlice({
  name: 'pictures',
  initialState,
  reducers: {
    setPictures(state, action) {
      const { picture } = action.payload;
      if (
        !state.pictures.find(
          (curPicture) => curPicture.nameId === picture.nameId
        )
      ) {
        state.pictures.push(picture);
      }
    },
    setAuthors(state, action) {
      const { author } = action.payload;
      if (!state.authors.includes(author)) {
        state.authors.push(author);
      }
    },
    setLoading(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.loading = action.payload.loading;
    }
  }
});

export const { setPictures, setLoading, setAuthors } = PicturesSlice.actions;

export default PicturesSlice.reducer;
