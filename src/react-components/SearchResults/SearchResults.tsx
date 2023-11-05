import { Product } from '../../utils/GeneralTypes';
import { MouseEventHandler, useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { SearchResultProps } from './types';
import React from 'react';
import './SearchResults.css';

export default function SearchResults(props: SearchResultProps) {
  const { results, currentPage } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    setIsDetailsOpen(location.pathname.includes('details'));
  }, [location]);

  const handleCloseDetailsClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    if (
      target?.classList.contains('search-results') &&
      !target?.classList.contains('planet-container')
    ) {
      setIsDetailsOpen(false);
      navigate('/');
    }
  };

  return (
    <React.Fragment>
      {!results.length ? (
        <div className="no-results">No results</div>
      ) : (
        <div
          className={`search-results ${isDetailsOpen ? 'with-details' : ''}`}
          onClick={handleCloseDetailsClick}
        >
          {results.map((result, index) => (
            <Link
              to={`/details/${result.id}`}
              key={result.id}
              className="product-container"
            >
              <h2 className="product-name">{`${index + 1}. ${
                result.title
              }`}</h2>
              <div className="product-description">
                <h3>{Product.DESCRIPTION}</h3>
                <p>{result.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}
