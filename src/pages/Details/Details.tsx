import { Link, useParams } from 'react-router-dom';
import { useGetProductDataQuery } from '../../store/api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { Product } from '../../utils/GeneralTypes';
import './Details.css';

export default function Details() {
  const { id } = useParams<{ id: string }>();

  const { data: productData, isLoading } = useGetProductDataQuery(
    parseInt(id!, 10)
  );

  return (
    <article className="details-section" data-testid="details-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Link
            to={`/`}
            key={id}
            className="details__close-btn"
            data-testid="close-button"
          />
          <div className="details-container">
            {productData && (
              <>
                <h2>Details of product</h2>
                <h3 className="details-heading">{productData.title}</h3>
                <p className="details-item">
                  {Product.BRAND}: {productData.brand}
                </p>
                <p className="details-item">
                  {Product.DESCRIPTION}: {productData.description}
                </p>
                <p className="details-item">
                  {Product.PRICE}: {productData.price} $
                </p>
                <p className="details-item">
                  {Product.DISCOUNT_PERCENTAGE}:{' '}
                  {productData.discountPercentage} %
                </p>
                <p className="details-item">
                  {Product.RATING}: {productData.rating}
                </p>
                <p className="details-item">
                  {Product.STOCK}: {productData.stock}
                </p>
              </>
            )}
          </div>
        </>
      )}
    </article>
  );
}
