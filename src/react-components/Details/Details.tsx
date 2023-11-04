import { Product } from '../../utils/GeneralTypes';
import { IDetailsProp } from './types';
import './details.css';

export default function Details({ info, onClose }: IDetailsProp) {
  return (
    <article className="details-container">
      <div className="details__close-btn" onClick={onClose}></div>
      <h2 className="details-heading">Details of product "{info.title}"</h2>
      <p className="details-item">
        {Product.BRAND} {info.brand}
      </p>
      <p className="details-item">
        {Product.DESCRIPTION} {info.description}
      </p>
      <p className="details-item">
        {Product.PRICE} {info.price} $
      </p>
      <p className="details-item">
        {Product.DISCOUNT_PERCENTAGE} {info.discountPercentage} %
      </p>
      <p className="details-item">
        {Product.RATING} {info.rating}
      </p>
      <p className="details-item">
        {Product.STOCK} {info.stock}
      </p>
    </article>
  );
}
