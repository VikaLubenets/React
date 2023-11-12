import { ChangeEvent, useContext } from 'react';
import { SearchProps } from './types';
import ErrorButton from '../ErrorButton/ErrorButton';
import SelectElement from '../SelectElement/SelectElement';
import { AppContext } from '../../react-components/Contexts/AppContext';
import './Header.css';

export default function Header({ getPage }: SearchProps) {
  const { savedTerm, setSavedTerm, limitPerPage } = useContext(AppContext);

  const handleSearch = () => {
    const term = savedTerm.trim();
    if (term) {
      localStorage.setItem('savedTerm', term);
      setSavedTerm(term);
      getPage(1, limitPerPage, term);
    } else {
      localStorage.removeItem('savedTerm');
      getPage(1, limitPerPage);
    }
  };

  return (
    <div className="search-line">
      <input
        type="search"
        value={savedTerm}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSavedTerm(event.target.value)
        }
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      <ErrorButton />
      <SelectElement />
    </div>
  );
}
