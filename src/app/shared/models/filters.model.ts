import { Game } from "src/app/core/models/game.model";

export interface IFilters<T> {
  nameField: keyof T;
  filterFn: (name: any) => boolean;
}


export class Filters<T> implements IFilters<T> {
  nameField: keyof T;
  filterFn: (name: any) => boolean;

  private constructor(nameField: keyof T,filterFn: (name: any) => boolean) {
    this.nameField = nameField;
    this.filterFn = filterFn;
  };

  static filterByName<T>(nameField: keyof T,value:string) {
    value.trim().toLowerCase();
    return new Filters<T>(nameField,(name: string) => name.trim().toLowerCase().includes(value));
  }

  static filterById<T>(nameField: keyof T,value:number) {
    return new Filters<T>(nameField,(name: number) => name == value);
  }


}

export class GameFilters implements IFilters<Game>{
  nameField: keyof Game;
  filterFn: (name: any) => boolean;
  private constructor(nameField: keyof Game,filterFn: (name: any) => boolean) {
    this.nameField = nameField;
    this.filterFn = filterFn;
  };

  static filterByHomeGame() {
    return new GameFilters('numClubRec',(numClubRec:number) => numClubRec == 5667028)
  }

  static filterByDated() {
    return new GameFilters('datetime',(datetime:any) => datetime)
  }

  static filterByNextWE(nameField: keyof Game) {
    let now = new Date();
    let plusSevenDay = new Date();
    plusSevenDay.setDate(plusSevenDay.getDate() + 7);
    return new GameFilters(nameField,(name: Date) =>
    {
      name = new Date(name);
      return name > now && name < plusSevenDay });
  }

  static filterWithoutBarmen() {
    return new GameFilters('barmen',(barmen:{id:number}[]) => barmen.length == 0)
  }

}
