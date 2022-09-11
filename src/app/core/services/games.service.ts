import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IFilters } from 'src/app/shared/models/filters.model';
import { Game } from 'src/app/core/models/game.model';
import { FilterService } from 'src/app/shared/services/filter.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(
    private httpClient: HttpClient,
    private filterService: FilterService
  ) {}

  getAllGames(filtersInfo?: IFilters<Game>[]): Observable<Game[]> {
    let games$ = this.httpClient.get<Game[]>(`${environment.urlServer}/games`);
    if (filtersInfo) {
      games$ = games$.pipe(
        map((games) => [...games].sort((game1:Game,game2:Game) => this.sortedByDatetime(game1.datetime,game2.datetime))),
        map((sortedGames) =>
        sortedGames.filter((game) =>
            this.filterService.createFilter(game, filtersInfo)
          )
        )
      );
    }

    return games$;
  }

  getGameById(id:number): Observable<Game> {
    return this.httpClient.get<Game>(`${environment.urlServer}/games/${id}`);
  }

  private sortedByDatetime(date1?:string|Date,date2?:string|Date): number {
    // On teste si les dates existent afin de les mettre les match non daté à la fin.
    if(date1 && date2) {
      return new Date(date1).getTime() - new Date(date2).getTime();
    } else if(date1) {
      return -1
    } else {
      return 1;
    }
  }
}
