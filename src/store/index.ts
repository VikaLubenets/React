import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';
import productsReducer from './reducers/productsReducer';

const rootReducer = combineReducers({
  productsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};
