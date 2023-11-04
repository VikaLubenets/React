import { ChangeEvent } from 'react';
import { IProduct } from '../../utils/GeneralTypes';
import ButtonError from '../ErrorButton/ErrorButton';
import { useState } from 'react';
import SelectElements from '../SelectElement/SelectElement';
import './header.css';
import { SearchProps } from './types';
import { BASE_URL } from '../../utils/Constants';

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
      url = `${BASE_URL}/search?q=${term}`;
      localStorage.setItem('searchTermSaved', term);
    } else {
      url = BASE_URL;
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
