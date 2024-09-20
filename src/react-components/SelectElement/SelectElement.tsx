import { ChangeEvent, useState } from 'react';
import { ISelectElements } from './types';
import './SelectElement.css';

export default function SelectElement(props: ISelectElements) {
  const [options] = useState([10, 20, 30]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedItemsAmount = parseInt(event.target.value, 10);
    props.onItemsChange(selectedItemsAmount);
  };

  return (
    <select className="select" onChange={handleSelectChange}>
      <option disabled>Select Items Quantity</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
