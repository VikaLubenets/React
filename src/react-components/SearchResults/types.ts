import { IProduct } from '../../utils/GeneralTypes';

export type SearchResultProps = {
  results: IProduct[];
  currentPage: number;
};
