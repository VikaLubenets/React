import { IProduct } from '../../utils/GeneralTypes';

export type SearchProps = {
  onSearch: (url: string) => Promise<void>;
  onDataLoaded: (data: IProduct[]) => void;
  onItemsChange: (num: number) => void;
};
