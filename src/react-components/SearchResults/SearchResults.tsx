import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../utils/GeneralTypes';
import { AppContext } from '../../react-components/Contexts/AppContext';
import './SearchResults.css';
import Card from '../Card/Card';
import { useGetDataQuery } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { productsSlice } from '../../store/reducers/productsReducer';

export default function SearchResults() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchResults = useAppSelector((state) => state.products.searchResults);
  const isDetailsOpen = useAppSelector((state) => state.products.isDetailsOpen);

  useEffect(() => {
    dispatch(
      productsSlice.actions.setIsDetailsOpen(
        location.pathname.includes('details')
      )
    );
  }, [location]);

  return (
    <React.Fragment>
      {!searchResults || !searchResults.length ? (
        <div className="no-results">No results</div>
      ) : (
        <Link
          to={`/`}
          className={`search-results ${isDetailsOpen ? 'with-details' : ''}`}
          data-testid="cards-container"
        >
          {searchResults.map((result, index) => (
            <Card key={result.id} result={result} index={index} />
          ))}
        </Link>
      )}
    </React.Fragment>
  );
}
