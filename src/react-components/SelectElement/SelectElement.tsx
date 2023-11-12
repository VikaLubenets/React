import { ChangeEvent, useState, useContext } from 'react';
import { ISelectElements } from './types';
import { AppContext } from '../../react-components/Contexts/AppContext';
import './SelectElement.css';

export default function SelectElement() {
  const { setLimitPerPage } = useContext(AppContext);
  const [options] = useState([10, 20, 30]);

  return (
    <select
      className="select"
      onChange={(event: ChangeEvent<HTMLSelectElement>) =>
        setLimitPerPage(parseInt(event.target.value, 10))
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
