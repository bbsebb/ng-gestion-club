import { IChipFilters } from "./chip-filters.model";

export interface IChips<T> {
  name: string;
  selected: boolean;
  filterInfo:IChipFilters<T>
}


