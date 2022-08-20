
export interface IChips<T> {
  name: string;
  selected: boolean;
  filterInfo:IfilterInfo<T>
}


export interface IfilterInfo<T> {
  nameField: keyof T;
  filterFn: (name: any) => boolean;
}
