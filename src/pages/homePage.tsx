/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../react-components/Pagination/Pagination';
import Search from '../react-components/Header/Header';
import SearchResult from '../react-components/SearchResults/SearchResults';
import {
  IPlanet,
  IProduct,
  IProductList,
  SwapiData,
} from '../utils/GeneralTypes';
import Loader from '../react-components/Loader/Loader';
import { BASE_URL } from '../utils/Constants';
import SearchResults from '../react-components/SearchResults/SearchResults';

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalCount, setTotalCount] = useState(60);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const handleSearch = async (url: string) => {
    try {
      setIsLoaded(false);
      const response = await fetch(url);
      const data: IProductList = await response.json();
      setTotalCount(data.total);
      setSearchResults(data.products);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setIsLoaded(true);
    }
  };

  const getPage = (page: number = 1, search?: string) => {
    let url;
    if (search) {
      url = `${BASE_URL}/search?q=${search}`;
      searchParams.set('page', String(page));
      searchParams.set('search', search);
    } else {
      url = BASE_URL;
      searchParams.set('page', String(page));
      searchParams.delete('search');
    }
    navigate('?' + searchParams.toString());
    handleSearch(url);
  };

  const handleDataLoaded = (data: IProduct[]) => {
    setSearchResults(data);
    setIsLoaded(true);
  };

  useEffect(() => {
    const searchTermSaved = localStorage.getItem('searchTermSaved');
    if (searchTermSaved) {
      getPage(1, searchTermSaved);
    } else {
      getPage(1);
    }
  }, [currentPage, limitPerPage]);

  return (
    <React.Fragment>
      <Search
        onSearch={handleSearch}
        onDataLoaded={handleDataLoaded}
        onItemsChange={setLimitPerPage}
      />
      {isLoaded ? (
        <React.Fragment>
          <SearchResults results={searchResults} currentPage={currentPage} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / limitPerPage)}
            onPageChange={setCurrentPage}
          />
          <Outlet />
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
}
