import {Pool} from "./pool.model";
import {Halle} from "./halle.model";
import {Referee} from "./referee.model";
import {Team} from "./team.model";
import {Score} from "./score.model";


export interface Game {
  code: string;
  pool: Pool;
  day: number;
  halle: Halle;
  referee1: Referee;
  referee2: Referee;
  homeTeam: Team;
  visitingTeam: Team;
  fdme?: any;
  barmen: any[];
  score: Score;
  dateTime: Date;
  played: boolean;
}

