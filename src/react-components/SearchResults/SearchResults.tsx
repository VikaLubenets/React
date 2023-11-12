import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../utils/GeneralTypes';
import { AppContext } from '../../react-components/Contexts/AppContext';
import './SearchResults.css';
import Card from '../Card/Card';

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
          data-testid="cards-container"
        >
          {searchedResults.map((result, index) => (
            <Card key={result.id} result={result} index={index} />
          ))}
        </Link>
      )}
    </React.Fragment>
  );
}
