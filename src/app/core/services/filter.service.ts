import { Injectable } from '@angular/core';
import { IFilters } from 'src/app/shared/models/filters.model';



@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  createFilter<T>(arrayItem: T, filters: IFilters<T>[]): boolean {
    let flag = true;
    for (const filter of filters) {
      flag &&= filter.filterFn(arrayItem[filter.nameField]);
    }
    return flag;
  }
}
