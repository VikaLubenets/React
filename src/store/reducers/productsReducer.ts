import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IProductList } from '../../utils/GeneralTypes';
import { ActionType, AppDispatch, productsState } from '../types';

const initialState: productsState = {
  searchResults: [] as IProduct[],
  savedTerm: '',
  isLoading: false,
  totalCount: 10,
  currentPage: 1,
  limitPerPage: 10,
  totalPages: 1,
  error: null,
  isDetailsOpen: false,
  isProductLoading: false,
};

export const initializeSavedTerm = () => (dispatch: AppDispatch) => {
  const initialSavedTerm = localStorage.getItem('savedTerm');
  if (initialSavedTerm) {
    dispatch(productsSlice.actions.setSavedTerm(initialSavedTerm));
  }
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSavedTerm(state, action: PayloadAction<string>) {
      state.savedTerm = action.payload;
    },
    setSearchResults(state, action: PayloadAction<IProduct[]>) {
      state.searchResults = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLimitPerPage(state, action: PayloadAction<number>) {
      state.limitPerPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setIsDetailsOpen(state, action) {
      state.isDetailsOpen = action.payload;
    },
    setIsProductLoading(state, action) {
      state.isDetailsOpen = action.payload;
    },
  },
});
