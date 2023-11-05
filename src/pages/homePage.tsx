import React, { Dispatch, useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { IProduct, IProductList } from '../utils/GeneralTypes';
import { BASE_URL } from '../utils/Constants';
import { SearchProps } from '../react-components/Header/types';
import Pagination from '../react-components/Pagination/Pagination';
import SearchResults from '../react-components/SearchResults/SearchResults';
import Loader from '../react-components/Loader/Loader';
import Header from '../react-components/Header/Header';

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [searchParams] = useSearchParams();
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

  const getPage = (page: number = 1, limit: number, search?: string) => {
    let url = BASE_URL;
    searchParams.delete('search');
    const skip = (page - 1) * (limit || 0);

    if (search) {
      url = `${BASE_URL}/search?q=${search}`;
      searchParams.delete('page');
      searchParams.delete('limit');
      searchParams.set('search', String(search));
    } else {
      url = `${BASE_URL}/?limit=${limit}&skip=${skip}`;
      searchParams.set('page', String(page));
      searchParams.set('limit', String(limit));
    }

    navigate('?' + searchParams.toString());
    handleSearch(url);
  };

  const resetCurrentPage = () => {
    if (limitPerPage > 1) {
      setCurrentPage(1);
    }
  };

  const updatePage = (currentPage: number, limitPerPage: number) => {
    const searchTermSaved = localStorage.getItem('searchTermSaved');
    if (searchTermSaved) {
      getPage(currentPage, limitPerPage, searchTermSaved);
    } else {
      getPage(currentPage, limitPerPage);
    }
  };

  useEffect(() => {
    resetCurrentPage();
    updatePage(currentPage, limitPerPage);
  }, [limitPerPage]);

  useEffect(() => {
    updatePage(currentPage, limitPerPage);
  }, [currentPage, searchParams]);

  return (
    <React.Fragment>
      <Header
        getPage={getPage}
        onItemsChange={setLimitPerPage}
        limitPerPage={limitPerPage}
      />
      {isLoaded ? (
        <main>
          <div className="search-result__container">
            <SearchResults results={searchResults} currentPage={currentPage} />
            <Outlet />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / limitPerPage)}
            onPageChange={setCurrentPage}
          />
        </main>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
}
