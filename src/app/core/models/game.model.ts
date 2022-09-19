

export interface Game {
  id: number;
  type: 'championnat' | 'coupe' | 'amical';
  state: 'joué' | 'non joué';
  penalty: boolean,
  forfeit:boolean,
  glue:boolean,
  fdme?: URL;
  code: string;
  competition: string;
  numGroup: string;
  nameGroup: string;
  day: number;
  datetime?: Date;
  nameClubRec: string;
  numClubRec:number;
  scoreclubRec?:number,
  nameClubVis: string;
  numClubVis:number;
  scoreClubVis?:number,
  referee1?: string;
  realReferee1?: string;
  referee2?: string;
  realReferee2?: string;
  secretary?:string | number;
  timekeeper?:string | number;
  halleManager?:string | number;
  nameHalle?: string;
  addressHalle?: string;
  cpHalle?: string;
  cityHalle?: string;
  barmen: [
    {id: number},
  ]
}
