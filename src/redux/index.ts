import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './AuthSlice';
import PicturesReducer from './PicturesSlice';
import ThemeReducer from './ThemeSlice';

const store = configureStore({
  reducer: { auth: AuthReducer, pictures: PicturesReducer, theme: ThemeReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
