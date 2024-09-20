import React, { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from '../../react-components/Pagination/Pagination';
import SearchResults from '../../react-components/SearchResults/SearchResults';
import Loader from '../../react-components/Loader/Loader';
import Header from '../../react-components/Header/Header';
import { useGetDataQuery } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { productsSlice } from '../../store/reducers/productsReducer';
import './HomePage.css';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const savedTerm = useAppSelector((state) => state.products.savedTerm);
  const currentPage = useAppSelector((state) => state.products.currentPage);
  const limitPerPage = useAppSelector((state) => state.products.limitPerPage);
  const { data: searchResults, isLoading } = useGetDataQuery({
    page: currentPage,
    limit: limitPerPage,
    search: savedTerm,
  });

  useEffect(() => {
    if (savedTerm) {
      setSearchParams({
        search: savedTerm,
        page: String(currentPage),
        limit: String(limitPerPage),
      });
    } else {
      setSearchParams({
        page: String(currentPage),
        limit: String(limitPerPage),
      });
    }
  }, [searchParams, currentPage, limitPerPage, savedTerm]);

  useEffect(() => {
    if (searchResults) {
      dispatch(productsSlice.actions.setSearchResults(searchResults.products));
      dispatch(productsSlice.actions.setTotalCount(searchResults.total));
    }
  }, [searchResults]);

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
