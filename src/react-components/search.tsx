import { ChangeEvent } from 'react';
import { IPlanet } from '../types/apiRoot';
import ButtonError from './errorButton';
import '../styles/search.css';
import { useState } from 'react';

type SearchProps = {
  onSearch: (url: string) => Promise<void>;
  onDataLoaded: (data: IPlanet[]) => void;
};

export default function Search({ onSearch, onDataLoaded }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTermSaved') || ''
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const term = searchTerm.trim();
    let url;
    if (term) {
      url = `https://swapi.dev/api/planets/?search=${term}`;
      localStorage.setItem('searchTermSaved', term);
    } else {
      url = 'https://swapi.dev/api/planets/';
    }

    onSearch(url);
  };

  return (
    <div className="search-line">
      <input type="search" value={searchTerm} onChange={handleInputChange} />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      <ButtonError />
    </div>
  );
}
