import { IProduct } from '../utils/GeneralTypes';

export interface ActionType {
  type: string;
  payload: IProduct[];
}

export interface productsState {
  productsData: IProduct[];
  isLoaded: boolean;
  totalCount: number;
  currentPage: number;
  limitPerPage: number;
  totalPages: number;
  error: null | string;
}
