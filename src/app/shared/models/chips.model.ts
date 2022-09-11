import { Filters } from "./filters.model";

export interface IChips<T> {
  name: string;
  selected: boolean;
  filterInfo:Filters<T>
}


