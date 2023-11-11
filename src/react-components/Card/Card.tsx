import { Link } from 'react-router-dom';
import { Product } from '../../utils/GeneralTypes';
import { ICardProps } from './types';

export default function Card({ result, index }: ICardProps) {
  return (
    <Link
      to={`/details/${result.id}`}
      className="product-container"
      data-testid="product-container"
    >
      <h2 className="product-name">{`${index + 1}. ${result.title}`}</h2>
      <div className="product-description">
        <h3>{Product.DESCRIPTION}:</h3>
        <p>{result.description}</p>
      </div>
    </Link>
  );
}
