import { IPlanet } from '../types/apiRoot';
import '../styles/searchResult.css';

type SearchResultProps = {
  results: IPlanet[];
};

export default function SearchResult(props: SearchResultProps) {
  const { results } = props;
  return (
    <main className="search-result__container">
      {!results.length ? (
        <div className="no-results">No results</div>
      ) : (
        results.map((result, index) => (
          <div key={index} className="planet-container">
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
        ))
      )}
    </main>
  );
}
