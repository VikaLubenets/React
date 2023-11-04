import { IPlanet } from '../types/apiRoot';
import { MouseEventHandler, useState } from 'react';
import Details from './details';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/searchResult.css';

type SearchResultProps = {
  results: IPlanet[];
  currentPage: number;
};

export default function SearchResult(props: SearchResultProps) {
  const { results, currentPage } = props;
  const [selectedPlanet, setSelectedPlanet] = useState<IPlanet | null>(null);
  const [isPlanetLoading, setIsPlanetLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const openDetails = async (index: number) => {
    try {
      setIsPlanetLoading(true);
      const url = results[index].url;
      const ItemId = url.match(/\/(\d+)\/?$/)?.[1] as string;
      const response = await fetch(url);
      const planet: IPlanet = await response.json();
      setSelectedPlanet(planet);
      setIsPlanetLoading(false);
      searchParams.set('details', ItemId);
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
      target &&
      target.classList.contains('search-results') &&
      !target.classList.contains('planet-container')
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
              <h2 className="planet-name">{`${index + 1}. ${result.name}`}</h2>
              <div className="planet-description">
                <div className="planet-info__block">
                  <h3>Climate: </h3>
                  <p>{result.climate}</p>
                </div>
                <div className="planet-info__block">
                  <h3>Diameter: </h3>
                  <p>{result.diameter}</p>
                </div>
                <div className="planet-info__block">
                  <h3>Gravity: </h3>
                  <p>{result.gravity}</p>
                </div>
                <div className="planet-info__block">
                  <h3>Surface Water: </h3>
                  <p>{result.surface_water}</p>
                </div>
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
            <Details info={selectedPlanet} onClose={closeDetails} />
          </div>
        )
      )}
    </main>
  );
}
