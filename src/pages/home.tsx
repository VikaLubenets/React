import React, { useEffect, useState } from 'react';
import Search from '../react-components/search';
import SearchResult from '../react-components/searchResult';
import { IPlanet, SwapiData } from '../types/apiRoot';

export default function Home() {
  const [searchResults, setSearchResults] = useState<IPlanet[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSearch = async (url: string) => {
    try {
      setIsLoaded(false);
      const response = await fetch(url);
      const data: SwapiData = await response.json();
      setSearchResults(data.results);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setIsLoaded(true);
    }
  };

  const handleDataLoaded = (data: IPlanet[]) => {
    setSearchResults(data);
    setIsLoaded(true);
  };

  useEffect(() => {
    const searchTermSaved = localStorage.getItem('searchTermSaved');
    if (searchTermSaved) {
      handleSearch(`https://swapi.dev/api/planets/?search=${searchTermSaved}`);
    } else {
      handleSearch('https://swapi.dev/api/planets/');
    }
  }, []);

  return (
    <React.Fragment>
      <Search onSearch={handleSearch} onDataLoaded={handleDataLoaded} />
      {isLoaded ? (
        <SearchResult results={searchResults} />
      ) : (
        <div className="loader">Loading...</div>
      )}
    </React.Fragment>
  );
}
