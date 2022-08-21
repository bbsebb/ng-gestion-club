import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IChipFilters } from 'src/app/shared/models/chip-filters.model';
import { Game } from 'src/app/shared/models/game.model';
import { ChipsService } from 'src/app/shared/services/chips.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class GamesService {

  constructor(private httpClient: HttpClient,private chipsService:ChipsService) {}

  getAllGames(filtersInfo?: IChipFilters<Game>[]): Observable<Game[]> {
    let games$ = this.httpClient.get<Game[]>(`${environment.urlServer}/games`);
    if (filtersInfo) {
      games$ = games$.pipe(
        map((games) =>
        games.filter((game) => this.chipsService.createFilter(game,filtersInfo))
        )
      );
    }

    return games$;
  }
}
