import { ChangeEvent, useContext } from 'react';
import ErrorButton from '../ErrorButton/ErrorButton';
import SelectElement from '../SelectElement/SelectElement';
import { AppContext } from '../../react-components/Contexts/AppContext';
import './Header.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { productsSlice } from '../../store/reducers/productsReducer';

export default function Header() {
  const dispatch = useAppDispatch();
  const savedTerm = useAppSelector((state) => state.products.savedTerm);

  const handleSearch = () => {
    if (savedTerm) {
      localStorage.setItem('savedTerm', savedTerm);
    } else {
      localStorage.removeItem('savedTerm');
      dispatch(productsSlice.actions.setSavedTerm(''));
    }
  };

  return (
    <div className="search-line">
      <input
        type="search"
        value={savedTerm}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch(
            productsSlice.actions.setSavedTerm(event.target.value.trim())
          );
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
