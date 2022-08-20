import { Injectable } from '@angular/core';
import { IfilterInfo } from '../models/chips.model';

@Injectable({
  providedIn: 'root',
})
export class ChipsService {
  constructor() {}

  createFilter<T>(game: T, filters: IfilterInfo<T>[]): boolean {
    let flag = true;
    for (const filter of filters) {
      flag &&= filter.filterFn(game[filter.nameField]);
    }
    return flag;
  }
}
