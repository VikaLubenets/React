import { IPlanet } from '../../utils/GeneralTypes';
import { IDetailsProp } from './types';
import './details.css';

export default function Details({ info, onClose }: IDetailsProp) {
  return (
    <article className="details-container">
      <div className="details__close-btn" onClick={onClose}></div>
      <h2 className="details-heading">Details of planet "{info.name}"</h2>
      <p className="details-item">Climate: {info.climate}</p>
      <p className="details-item">Created: {info.created}</p>
      <p className="details-item">Diameter: {info.diameter}</p>
      <p className="details-item">Gravity: {info.gravity}</p>
      <p className="details-item">Orbital period: {info.orbital_period}</p>
      <p className="details-item">Population: {info.population}</p>
      <p className="details-item">Rotation period: {info.rotation_period}</p>
    </article>
  );
}
