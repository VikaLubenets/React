import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../store/hooks/redux';
import { productsSlice } from '../../store/reducers/productsReducer';
import './SelectElement.css';

export default function SelectElement() {
  const dispatch = useAppDispatch();

  const handleSelectClick = (num: number) => {
    dispatch(productsSlice.actions.setLimitPerPage(num));
  };
  const options = [10, 20, 30];

  return (
    <select
      className="select"
      onChange={(event: ChangeEvent<HTMLSelectElement>) =>
        handleSelectClick(parseInt(event.target.value, 10))
      }
    >
      <option disabled>Select Items Quantity</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
