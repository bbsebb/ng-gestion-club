import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilters } from 'src/app/shared/models/filters.model';
import { Game } from 'src/app/core/models/game.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {

  private _games$:BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
  get games$():Observable<Game[]>{
    return this._games$.asObservable();
  }


  constructor(
    private httpClient: HttpClient,
    private filterService: FilterService,
    private auth:AuthenticationService
  ) {}

  getGamesFromServer():void {
     this.httpClient.get<Game[]>(`${environment.urlServer}/games`).pipe(
      tap(
        games => this._games$.next(games)
      )
    ).subscribe();
  }

  getAllGames(filtersInfo?: IFilters<Game>[]): Observable<Game[]> {
    this.getGamesFromServer();
    if (filtersInfo) {
      return  this.games$.pipe(
        map((games) => [...games].sort((game1:Game,game2:Game) => this.sortedByDatetime(game1.datetime,game2.datetime))),
        map((sortedGames) =>
        sortedGames.filter((game) =>
            this.filterService.createFilter(game, filtersInfo)
          )
        )
      );
    } else {
      return this.games$;
    }
  }

  getGameById(id:number): Observable<Game> {
    return this.games$.pipe(
      map(games => {
        let foundGame = games.find(game=>game.id == id);
        if(foundGame) {
          return foundGame;
        } else {
          throw new Error('Aucune rencontre à cette endroit');
        }
      })
    );
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

  addBarman(id:number):Observable<Game> {
    return this.getGameById(id).pipe(
      tap(game => game.barmen.push({id:this.auth.getUserId()})),
    switchMap(game => this.httpClient.put<Game>(
      `${environment.urlServer}/games/${id}`,game
    )
    )
    )
  }

  removeBarman(id:number):Observable<Game> {
    return this.getGameById(id).pipe(
      tap(game => {
         game.barmen.splice(game.barmen.findIndex(barmen => barmen.id == this.auth.getUserId()),1
         );

      }),

    switchMap(game => this.httpClient.put<Game>(
      `${environment.urlServer}/games/${id}`,game
    ).pipe(
      tap(() => this.getGamesFromServer())
    )
    )
    )
  }
}
