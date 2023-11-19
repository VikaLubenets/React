import { IProduct } from '../utils/GeneralTypes';
import { Reducer, Store } from '@reduxjs/toolkit';

export interface ActionType {
  type: string;
  payload: IProduct[];
}

export interface productsState {
  productsData: IProduct[];
  isLoading: boolean;
  totalCount: number;
  currentPage: number;
  limitPerPage: number;
  totalPages: number;
  error: null | string;
}

export interface RootState {
  products: productsState;
}
export type setupStore = () => Store;
export type RootReducer = Reducer<RootState>;
export type AppStore = ReturnType<setupStore>;
export type AppDispatch = AppStore['dispatch'];
