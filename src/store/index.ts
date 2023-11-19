import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';
import { productsSlice } from './reducers/productsReducer';

export const setupStore = () => {
  return configureStore({
    reducer: {
      products: productsSlice.reducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};
