import { useState, useEffect } from 'react';
import { IProduct, Product } from '../../utils/GeneralTypes';
import { IDetailsProp } from './types';
import { BASE_URL } from '../../utils/Constants';
import './details.css';

export default function Details({ id, onClose }: IDetailsProp) {
  const [productData, setProductData] = useState<IProduct | null>(null);

  const getProductData = async (itemId: number) => {
    try {
      const url = `${BASE_URL}/${itemId}`;
      const ProductData = await fetch(url);
      const data = await ProductData.json();
      setProductData(data);
    } catch (error) {
      console.log('Error with fetching data for product details: ', error);
    }
  };

  useEffect(() => {
    getProductData(id);
  }, [id]);

  return (
    <article className="details-container">
      <div className="details__close-btn" onClick={onClose}></div>
      {productData && (
        <>
          <h2 className="details-heading">
            Details of product "{productData.title}"
          </h2>
          <p className="details-item">
            {Product.BRAND} {productData.brand}
          </p>
          <p className="details-item">
            {Product.DESCRIPTION} {productData.description}
          </p>
          <p className="details-item">
            {Product.PRICE} {productData.price} $
          </p>
          <p className="details-item">
            {Product.DISCOUNT_PERCENTAGE} {productData.discountPercentage} %
          </p>
          <p className="details-item">
            {Product.RATING} {productData.rating}
          </p>
          <p className="details-item">
            {Product.STOCK} {productData.stock}
          </p>
        </>
      )}
    </article>
  );
}
