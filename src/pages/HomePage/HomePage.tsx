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
import './HomePage.css';

export default function HomePage() {
  const [savedTerm, setSavedTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalCount / limitPerPage)
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const сontext: IAppContext = {
    savedTerm: savedTerm,
    searchedResults: searchResults,
    isLoaded: isLoaded,
    totalCount: totalCount,
    currentPage: currentPage,
    limitPerPage: limitPerPage,
    totalPages: totalPages,
    setSavedTerm: setSavedTerm,
    setSearchResults: setSearchResults,
    setIsLoaded: setIsLoaded,
    setTotalCount: setTotalCount,
    setCurrentPage: setCurrentPage,
    setLimitPerPage: setLimitPerPage,
    setTotalPages: setTotalPages,
  };

  const handleSearch = async (url: string) => {
    setIsLoaded(false);
    const data = await getData(url);
    setTotalCount(data!.total);
    setSearchResults(data!.products);
    setIsLoaded(true);
  };

  const getPage = (page = 1, limit: number, search?: string | null) => {
    let url = BASE_URL;
    searchParams.delete('search');
    const skip = (page - 1) * (limit || 0);

    if (search) {
      url = `${BASE_URL}/search?q=${search}&limit=${limit}&skip=${skip}`;
      setSearchParams({
        page: String(page),
        limit: String(limit),
        search: search,
      });
    } else {
      url = `${BASE_URL}/?limit=${limit}&skip=${skip}`;
      setSearchParams({
        page: String(page),
        limit: String(limit),
      });
    }

    handleSearch(url);
  };

  const resetCurrentPage = () => {
    if (limitPerPage > 1) {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    resetCurrentPage();
    getPage(currentPage, limitPerPage, savedTerm);
  }, [limitPerPage]);

  useEffect(() => {
    getPage(currentPage, limitPerPage, savedTerm);
  }, [currentPage, searchParams]);

  useEffect(() => {
    const totalPages = Math.ceil(totalCount / limitPerPage);
    setTotalPages(totalPages);
  }, [totalCount, limitPerPage]);

  return (
    <AppContext.Provider value={сontext}>
      <React.Fragment>
        <Header getPage={getPage} />
        {isLoaded ? (
          <main>
            <div className="search-result__container">
              <SearchResults />
              <Outlet />
            </div>
            <Pagination />
          </main>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    </AppContext.Provider>
  );
}
