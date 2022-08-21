export interface IChipFilters<T> {
  nameField: keyof T;
  filterFn: (name: any) => boolean;
}


export class ChipFilters<T> implements IChipFilters<T> {
  nameField: keyof T;
  filterFn: (name: any) => boolean;

  private constructor(nameField: keyof T,filterFn: (name: any) => boolean) {
    this.nameField = nameField;
    this.filterFn = filterFn;
  };

  static filterByName<T>(nameField: keyof T,value:string) {
    value.trim().toLowerCase();
    return new ChipFilters<T>(nameField,(name: string) => name.trim().toLowerCase().includes(value));
  }

  static filterById<T>(nameField: keyof T,value:number) {
    return new ChipFilters<T>(nameField,(name: number) => name == value);
  }

  static filterByNextWE<T>(nameField: keyof T) {
    let now = new Date();
    let plusSevenDay = new Date();
    plusSevenDay.setDate(plusSevenDay.getDate() + 7);
    return new ChipFilters<T>(nameField,(name: Date) =>
    {
      name = new Date(name);
      return name > now && name < plusSevenDay });
  }
}
