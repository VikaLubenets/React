import { IPlanet } from '../../utils/GeneralTypes';

export type SearchProps = {
  onSearch: (url: string) => Promise<void>;
  onDataLoaded: (data: IPlanet[]) => void;
  onItemsChange: (num: number) => void;
};
