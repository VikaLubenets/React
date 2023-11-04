import { IPlanet } from '../../utils/GeneralTypes';

export interface IDetailsProp {
  info: IPlanet;
  onClose: () => void;
}
