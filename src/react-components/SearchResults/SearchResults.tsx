import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../utils/GeneralTypes';
import { AppContext } from '../../react-components/Contexts/AppContext';
import './SearchResults.css';

export default function SearchResults() {
  const { searchedResults } = useContext(AppContext);
  const location = useLocation();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    setIsDetailsOpen(location.pathname.includes('details'));
  }, [location]);

  return (
    <React.Fragment>
      {!searchedResults.length ? (
        <div className="no-results">No results</div>
      ) : (
        <Link
          to={`/`}
          className={`search-results ${isDetailsOpen ? 'with-details' : ''}`}
        >
          {searchedResults.map((result, index) => (
            <Link
              to={`/details/${result.id}`}
              key={result.id}
              className="product-container"
              data-testid="product-container"
            >
              <h2 className="product-name">{`${index + 1}. ${
                result.title
              }`}</h2>
              <div className="product-description">
                <h3>{Product.DESCRIPTION}:</h3>
                <p>{result.description}</p>
              </div>
            </Link>
          ))}
        </Link>
      )}
    </React.Fragment>
  );
}
