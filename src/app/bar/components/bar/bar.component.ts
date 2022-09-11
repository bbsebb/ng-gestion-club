import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { User } from 'src/app/core/models/user.model';
import { GamesService } from 'src/app/core/services/games.service';
import { UserService } from 'src/app/core/services/user.service';
import { GameFilters } from 'src/app/shared/models/filters.model';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  barmen$!:Observable<User[]>;
  nextGames$!: Observable<Game[]>;
  gamesWithoutBarmen$!:Observable<Game[]>;

  constructor(private gamesService: GamesService, private userService: UserService) {}

  ngOnInit(): void {
    this.nextGames$ = this.gamesService
    .getAllGames([
      GameFilters.filterByHomeGame(),
      GameFilters.filterByDated(),
    ]).pipe(
      map(games => [...games].slice(0,3))
    );;

    this.gamesWithoutBarmen$ = this.gamesService
    .getAllGames([
      GameFilters.filterWithoutBarmen(),
      GameFilters.filterByDated(),
    ]).pipe(
      map(games => [...games].slice(0,3))
    );


    this.barmen$ = this.userService.getAllUsers();
  }

}
