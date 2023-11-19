import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../utils/GeneralTypes';
import { AppContext } from '../../react-components/Contexts/AppContext';
import './SearchResults.css';
import Card from '../Card/Card';
import { useGetDataQuery } from '../../store/api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { productsSlice } from '../../store/reducers/productsReducer';

export default function SearchResults() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const savedTerm = useAppSelector((state) => state.products.savedTerm);
  const isDetailsOpen = useAppSelector((state) => state.products.isDetailsOpen);
  const currentPage = useAppSelector((state) => state.products.currentPage);
  const limitPerPage = useAppSelector((state) => state.products.limitPerPage);

  useEffect(() => {
    dispatch(
      productsSlice.actions.setIsDetailsOpen(
        location.pathname.includes('details')
      )
    );
  }, [location]);

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

  return (
    <React.Fragment>
      {!searchResults || !searchResults.products.length ? (
        <div className="no-results">No results</div>
      ) : (
        <Link
          to={`/`}
          className={`search-results ${isDetailsOpen ? 'with-details' : ''}`}
          data-testid="cards-container"
        >
          {searchResults.products.map((result, index) => (
            <Card key={result.id} result={result} index={index} />
          ))}
        </Link>
      )}
    </React.Fragment>
  );
}
