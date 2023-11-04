import { IProduct } from '../../utils/GeneralTypes';

export interface IDetailsProp {
  info: IProduct;
  onClose: () => void;
}
