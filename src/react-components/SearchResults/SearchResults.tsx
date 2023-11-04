import { IProduct, Product } from '../../utils/GeneralTypes';
import { MouseEventHandler, useState } from 'react';
import Details from '../Details/Details';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchResultProps } from './types';
import './SearchResults.css';
import { BASE_URL } from '../../utils/Constants';

export default function SearchResults(props: SearchResultProps) {
  const { results, currentPage } = props;
  const [selectedPlanet, setSelectedPlanet] = useState<IProduct | null>(null);
  const [isPlanetLoading, setIsPlanetLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const openDetails = async (index: number) => {
    try {
      setIsPlanetLoading(true);
      const url = `${BASE_URL}/${results[index].id}`;

      const response = await fetch(url);
      const planet: IProduct = await response.json();

      setSelectedPlanet(planet);
      setIsPlanetLoading(false);
      searchParams.set('details', String(results[index].id));
      navigate('?' + searchParams.toString());
    } catch (error) {
      setIsPlanetLoading(false);
      console.error('Error fetching data: ', error);
    }
  };

  const closeDetails = () => {
    setSelectedPlanet(null);
    searchParams.delete('details');
    navigate('?' + searchParams.toString());
  };

  const handleCloseClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    if (
      target?.classList.contains('search-results') &&
      !target?.classList.contains('planet-container')
    ) {
      closeDetails();
    }
  };

  return (
    <main className="search-result__container">
      {!results.length ? (
        <div className="no-results">No results</div>
      ) : (
        <div
          className={`search-results ${
            isPlanetLoading || selectedPlanet ? 'with-details' : ''
          }`}
          onClick={handleCloseClick}
        >
          {results.map((result, index) => (
            <div
              key={index}
              className="planet-container"
              onClick={() => openDetails(index)}
            >
              <h2 className="planet-name">{`${index + 1}. ${result.title}`}</h2>
              <div className="planet-description">
                <h3>{Product.DESCRIPTION}</h3>
                <p>{result.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {isPlanetLoading ? (
        <div className="details-section__loader">Loading...</div>
      ) : (
        selectedPlanet && (
          <div className="details-section">
            <Details id={1} onClose={closeDetails} />
          </div>
        )
      )}
    </main>
  );
}
