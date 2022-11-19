import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Filters } from './filters.model';

export interface IChips<T> {
  name: string;
  selected: boolean;
  filterInfo: Filters<T>;
}

export class Chips<T> implements IChips<T> {
  constructor(
    public name: string,
    public filterInfo: Filters<T>,
    public selected: boolean = false
  ) {}
}

export interface IChipsInfo<T> {
  name: string;
  chips: IChips<T>;
  subject: Subject<IChips<T>>;
}

export class ListChipsInfo<T> {
  listChips: IChipsInfo<T>[];

  constructor() {
    this.listChips = [];
  }

  add(chips: IChips<T>): ListChipsInfo<T> {
    const chipsInfo: IChipsInfo<T> = {
      name: chips.name,
      chips: chips,
      subject: new BehaviorSubject<IChips<T>>(chips),
    };
    this.listChips.push(chipsInfo);
    return this;
  }

  getAll(): IChipsInfo<T>[] {
    return this.listChips;
  }

  get(chipName: string): IChipsInfo<T> {
    const chipsInfoFound = this.listChips.find(
      (chipsInfo) => chipsInfo.name === chipName
    );
    if (!chipsInfoFound) {
      throw new Error(`Le chipsinfo ${chipName} n'existe pas`);
    }
    return chipsInfoFound;
  }

  getChips(chipName: string): IChips<T> {
    return this.get(chipName).chips;
  }

  getSubject(chipName: string): Subject<IChips<T>> {
    return this.get(chipName).subject;
  }

  getObservable(chipName: string): Observable<IChips<T>> {
    return this.getSubject(chipName).asObservable();
  }



  getAllSubject(): Subject<IChips<T>>[] {
    return this.listChips.map((chipsInfo) => chipsInfo.subject);
  }

  next(chipName: string,selected:boolean = false): void {
    this.getSubject(chipName).next({
      ...this.getChips(chipName),
      selected: selected,
    });
  }

  select(chipName: string):void {
    this.next(chipName,true);
  }

  deselect(chipName: string):void {
    this.next(chipName);
  }

  deselectAll():void {

    this.getAll().map(chipsInfo => chipsInfo.chips).forEach(chipsInfo => this.next(chipsInfo.name));
  }
}
