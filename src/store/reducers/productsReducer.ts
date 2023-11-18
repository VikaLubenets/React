import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCSESS,
} from '../../utils/Constants';
import { IProduct } from '../../utils/GeneralTypes';
import { ActionType, productsState } from '../types';

const initialState: productsState = {
  productsData: [] as IProduct[],
  isLoaded: false,
  totalCount: 10,
  currentPage: 1,
  limitPerPage: 10,
  totalPages: 1,
  error: null,
};

const action: ActionType = {
  type: '',
  payload: [],
};

export const productsReducer = (
  state = initialState,
  action: ActionType
): productsState => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, isLoaded: false, error: null, productsData: [] };
    case FETCH_PRODUCTS_SUCSESS:
      return { ...state, isLoaded: true, error: null, productsData: [] };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        isLoaded: true,
        error: 'error with fetch',
        productsData: [],
      };
    default:
      return state;
  }
};
