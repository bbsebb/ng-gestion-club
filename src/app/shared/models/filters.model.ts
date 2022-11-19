

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

