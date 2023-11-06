import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IProduct, Product } from '../../utils/GeneralTypes';
import { getProductData } from '../../utils/GlobalFunctions';
import './Details.css';

export default function Details() {
  const [productData, setProductData] = useState<IProduct | null>(null);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const loadDetails = async (id: number) => {
    setIsProductLoading(true);
    const data = await getProductData(id);
    setProductData(data);
    setIsProductLoading(false);
  };

  useEffect(() => {
    loadDetails(Number(id));
  }, [id]);

  return (
    <article className="details-section">
      {isProductLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Link to={`/`} key={id} className="details__close-btn" />
          <div className="details-container">
            {productData && (
              <>
                <h2 className="details-heading">
                  Details of product "{productData.title}"
                </h2>
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
