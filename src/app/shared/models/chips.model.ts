import { Filters } from "./filters.model";

export interface IChips<T> {
  name: string;
  selected: boolean;
  filterInfo:Filters<T>
}

export class Chips<T> implements IChips<T> {
  name: string;
  selected: boolean;
  filterInfo:Filters<T>;

  constructor(name: string,filterInfo:Filters<T>,selected: boolean = false) {
    this.name = name;
    this.filterInfo = filterInfo;
    this.selected = selected;
  }
}


