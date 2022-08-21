export interface Game {
  id: number;
  code: string;
  competition: string;
  numGroup: string;
  nameGroup: string;
  day: number;
  datetime: Date;
  nameClubRec: string;
  numClubRec:number;
  nameClubVis: string;
  numClubVis:number;
  referee1: string;
  referee2: string;
  nameHalle: string;
  addressHalle: string;
  cpHalle: string;
  cityHalle: string;
  barmans: [
    id: number,
  ]
}
