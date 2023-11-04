/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../react-components/pagination';
import Search from '../react-components/search';
import SearchResult from '../react-components/searchResult';
import { IPlanet, SwapiData } from '../types/apiRoot';

export default function Home() {
  const [searchResults, setSearchResults] = useState<IPlanet[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalCount, setTotalCount] = useState(60);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const handleSearch = async (url: string) => {
    try {
      setIsLoaded(false);
      const response = await fetch(url);
      const data: SwapiData = await response.json();
      setTotalCount(data.count);
      setSearchResults(data.results);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setIsLoaded(true);
    }
  };

  const getPage = (page: number = 1, search?: string) => {
    let url;
    if (search) {
      url = `https://swapi.dev/api/planets/?page=${page}&search=${search}`;
      searchParams.set('page', String(page));
      searchParams.set('search', search);
    } else {
      url = `https://swapi.dev/api/planets/?page=${page}`;
      searchParams.set('page', String(page));
      searchParams.delete('search');
    }
    navigate('?' + searchParams.toString());
    handleSearch(url);
  };

  const handleDataLoaded = (data: IPlanet[]) => {
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
  }, []);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const searchTermSaved = localStorage.getItem('searchTermSaved');
    if (searchTermSaved) {
      getPage(pageNumber, searchTermSaved);
    } else {
      getPage(pageNumber);
    }
  };

  const onSelectedItemsChange = (num: number) => {
    // const arr = [];
    // const requestsNum =
  };

  return (
    <React.Fragment>
      <Search
        onSearch={handleSearch}
        onDataLoaded={handleDataLoaded}
        onItemsChange={onSelectedItemsChange}
      />
      {isLoaded ? (
        <React.Fragment>
          <SearchResult results={searchResults} currentPage={currentPage} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / itemsPerPage)}
            onPageChange={onPageChange}
          />
          <Outlet />
        </React.Fragment>
      ) : (
        <div className="loader">Loading...</div>
      )}
    </React.Fragment>
  );
}
