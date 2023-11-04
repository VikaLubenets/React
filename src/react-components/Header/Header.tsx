import { ChangeEvent } from 'react';
import { IPlanet } from '../../utils/GeneralTypes';
import ButtonError from '../ErrorButton/errorButton';
import { useState } from 'react';
import SelectElements from '../SelectElement/SelectElement';
import './header.css';
import { SearchProps } from './types';

export default function Header({
  onSearch,
  onDataLoaded,
  onItemsChange,
}: SearchProps) {
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
      <SelectElements onItemsChange={onItemsChange} />
    </div>
  );
}
