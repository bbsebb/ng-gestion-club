import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private httpClient: HttpClient) { }


  getAllGames():Observable<Game[]> {
    return this.httpClient.get<Game[]>(`${environment.urlServer}/games`);
  }


}
