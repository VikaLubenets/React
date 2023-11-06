import { ChangeEvent, useState } from 'react';
import { SearchProps } from './types';
import ErrorButton from '../ErrorButton/ErrorButton';
import SelectElement from '../SelectElement/SelectElement';
import './Header.css';

export default function Header({
  getPage,
  onItemsChange,
  limitPerPage,
}: SearchProps) {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTermSaved') || ''
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const term = searchTerm.trim();
    if (term) {
      localStorage.setItem('searchTermSaved', term);
      getPage(1, limitPerPage, term);
    } else {
      localStorage.removeItem('searchTermSaved');
      getPage(1, limitPerPage);
    }
  };

  return (
    <div className="search-line">
      <input type="search" value={searchTerm} onChange={handleInputChange} />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      <ErrorButton />
      <SelectElement onItemsChange={onItemsChange} />
    </div>
  );
}
