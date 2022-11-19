import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, map, Observable, of, switchMap, tap,} from 'rxjs';
import {Game} from 'src/app/core/models/game.model';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private _games$: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
  get games$(): Observable<Game[]> {
    return this._games$.asObservable();
  }

  constructor(
    private httpClient: HttpClient
  ) {
    this.getGamesFromServer();
  }

  getGamesFromServer(): void {
    this.httpClient
      .get<Game[]>(`${environment.urlServer}/games`)
      .pipe(
        tap((games) => console.log(games)),
        tap((games) => this._games$.next(games))
      )
      .subscribe();
  }

  getAllGames(): Observable<Game[]> {
    return this.games$.pipe();
  }

  getGameById(code: string): Observable<Game> {
    return this.games$.pipe(
      map((games) => games.find((game) => game.code === code)),
      switchMap((game) => (game ? of(game) : EMPTY))
    );
  }
}









