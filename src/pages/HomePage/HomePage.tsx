import React, { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from '../../react-components/Pagination/Pagination';
import SearchResults from '../../react-components/SearchResults/SearchResults';
import Loader from '../../react-components/Loader/Loader';
import Header from '../../react-components/Header/Header';
import { useGetDataQuery } from '../../store/api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { productsSlice } from '../../store/reducers/productsReducer';
import './HomePage.css';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const savedTerm = useAppSelector((state) => state.products.savedTerm);
  const currentPage = useAppSelector((state) => state.products.currentPage);
  const limitPerPage = useAppSelector((state) => state.products.limitPerPage);
  const { data: searchResults } = useGetDataQuery({
    page: currentPage,
    limit: limitPerPage,
    search: savedTerm,
  });

  const hasResults =
    searchResults &&
    searchResults.products &&
    searchResults.products.length > 0;

  dispatch(
    productsSlice.actions.setSearchResults(
      hasResults ? searchResults.products : []
    )
  );

  dispatch(
    productsSlice.actions.setTotalCount(hasResults ? searchResults.total : 10)
  );

  const isLoading = useAppSelector((state) => state.products.isLoading);

  return (
    <React.Fragment>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <main>
          <div className="search-result__container">
            <SearchResults />
            <Outlet />
          </div>
          <Pagination />
        </main>
      )}
    </React.Fragment>
  );
}
