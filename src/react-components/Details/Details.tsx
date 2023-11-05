import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct, Product } from '../../utils/GeneralTypes';
import { BASE_URL } from '../../utils/Constants';
import './Details.css';

export default function Details() {
  const [productData, setProductData] = useState<IProduct | null>(null);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getProductData = async (itemId: number) => {
    try {
      setIsProductLoading(true);
      const url = `${BASE_URL}/${itemId}`;
      const productDataResponse = await fetch(url);
      const data = await productDataResponse.json();
      setProductData(data);
      setIsProductLoading(false);
    } catch (error) {
      console.log('Error with fetching data for product details: ', error);
    }
  };

  useEffect(() => {
    getProductData(Number(id));
  }, [id]);

  return (
    <article className="details-section">
      {isProductLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div
            className="details__close-btn"
            onClick={() => navigate('/')}
          ></div>
          <div className="details-container">
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
                  {Product.DISCOUNT_PERCENTAGE} {productData.discountPercentage}{' '}
                  %
                </p>
                <p className="details-item">
                  {Product.RATING} {productData.rating}
                </p>
                <p className="details-item">
                  {Product.STOCK} {productData.stock}
                </p>
              </>
            )}
          </div>
        </>
      )}
    </article>
  );
}
