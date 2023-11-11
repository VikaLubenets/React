import { IProduct } from '../../utils/GeneralTypes';

export interface IAppContext {
  savedTerm: string;
  searchedResults: IProduct[];
  isLoaded: boolean;
  totalCount: number;
  currentPage: number;
  limitPerPage: number;
  totalPages: number;
  setSearchResults: ContextSet<IProduct[]>;
  setIsLoaded: ContextSet<boolean>;
  setTotalCount: ContextSet<number>;
  setCurrentPage: ContextSet<number>;
  setLimitPerPage: ContextSet<number>;
  setSavedTerm: ContextSet<string>;
  setTotalPages: ContextSet<number>;
}

export type ContextSet<T> = (value: React.SetStateAction<T>) => void;
