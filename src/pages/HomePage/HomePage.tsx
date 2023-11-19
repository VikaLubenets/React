import React, { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { IProduct } from '../../utils/GeneralTypes';
import { BASE_URL } from '../../utils/Constants';
import { getData } from '../../utils/GlobalFunctions';
import Pagination from '../../react-components/Pagination/Pagination';
import SearchResults from '../../react-components/SearchResults/SearchResults';
import Loader from '../../react-components/Loader/Loader';
import Header from '../../react-components/Header/Header';
import { AppContext } from '../../react-components/Contexts/AppContext';
import { IAppContext } from '../../react-components/Contexts/types';
import { useGetProductDataQuery, useGetDataQuery } from '../../store/api/api';
import './HomePage.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { productsSlice } from '../../store/reducers/productsReducer';

export default function HomePage() {
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
