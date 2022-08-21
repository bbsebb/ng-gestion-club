import { Injectable } from '@angular/core';
import { IChipFilters } from '../models/chip-filters.model';


@Injectable({
  providedIn: 'root',
})
export class ChipsService {
  constructor() {}

  createFilter<T>(game: T, filters: IChipFilters<T>[]): boolean {
    let flag = true;
    for (const filter of filters) {
      flag &&= filter.filterFn(game[filter.nameField]);
    }
    return flag;
  }
}
