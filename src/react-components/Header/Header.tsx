import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { productsSlice } from '../../store/reducers/productsReducer';
import ErrorButton from '../ErrorButton/ErrorButton';
import SelectElement from '../SelectElement/SelectElement';
import './Header.css';

export default function Header() {
  const dispatch = useAppDispatch();
  const savedTerm = useAppSelector((state) => state.products.savedTerm);
  const [term, setTerm] = useState(savedTerm || '');

  const handleSearch = () => {
    if (term) {
      dispatch(productsSlice.actions.setSavedTerm(term));
      localStorage.setItem('savedTerm', term);
    } else {
      localStorage.removeItem('savedTerm');
      dispatch(productsSlice.actions.setSavedTerm(''));
    }
  };

  useEffect(() => {
    setTerm(savedTerm || '');
  }, [savedTerm]);

  return (
    <div className="search-line">
      <input
        type="search"
        value={term}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setTerm(event.target.value.trim());
        }}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      <ErrorButton />
      <SelectElement />
    </div>
  );
}
