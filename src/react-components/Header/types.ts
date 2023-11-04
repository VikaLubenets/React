import { IProduct } from '../../utils/GeneralTypes';

export type SearchProps = {
  onSearch: (url: string) => Promise<void>;
  onItemsChange: (num: number) => void;
};
