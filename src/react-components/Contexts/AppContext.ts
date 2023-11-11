import React from 'react';
import { IAppContext } from './types';

export const AppContext: React.Context<IAppContext> =
  React.createContext<IAppContext>({
    savedTerm: '',
    searchedResults: [],
    isLoaded: false,
    totalCount: 10,
    currentPage: 1,
    limitPerPage: 10,
    totalPages: 1,
    setSavedTerm: (): void => {},
    setSearchResults: (): void => {},
    setIsLoaded: (): void => {},
    setTotalCount: (): void => {},
    setCurrentPage: (): void => {},
    setLimitPerPage: (): void => {},
    setTotalPages: (): void => {},
    getPage: (): void => {},
  });
