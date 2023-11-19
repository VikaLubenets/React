import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FETCH_PRODUCTS_10,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCSESS,
} from '../../utils/Constants';
import { IProduct, IProductList } from '../../utils/GeneralTypes';
import { ActionType, productsState } from '../types';

const initialState: productsState = {
  productsData: [] as IProduct[],
  isLoading: false,
  totalCount: 10,
  currentPage: 1,
  limitPerPage: 10,
  totalPages: 1,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateTotalCount(state, action: PayloadAction<IProductList>) {
      state.totalCount = action.payload.total;
    },
    fetchingData(state) {
      state.isLoading = true;
    },
    fetchingDataSuccess(state, action: PayloadAction<IProductList>) {
      state.isLoading = false;
      state.error = '';
      state.productsData = action.payload.products;
    },
    fetchingDataError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
