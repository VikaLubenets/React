import { IProduct } from '../../utils/GeneralTypes';

export interface SearchProps {
  getPage: (page: number, limit: number, search?: string) => void;
}
