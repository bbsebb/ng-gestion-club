import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { GamesService } from 'src/app/core/services/games.service';
import { UserService } from 'src/app/core/services/user.service';
import { GameFilters, IFilters } from 'src/app/shared/models/filters.model';

@Component({
  selector: 'app-bar-control-panel',
  templateUrl: './bar-control-panel.component.html',
  styleUrls: ['./bar-control-panel.component.scss']
})
export class BarControlPanelComponent implements OnInit {

  @Output() changeTab = new EventEmitter<{tab:string,filters?:string[]}>();

  barmen$!:Observable<User[]>;
  nextGames$!: Observable<Game[]>;
  gamesWithoutBarmen$!:Observable<Game[]>;
  myGames$!:Observable<Game[]>;

  constructor(private gamesService: GamesService, private userService: UserService,private auth:AuthenticationService) {}

  ngOnInit(): void {
    this.nextGames$ = this.gamesService
    .getAllGames([
      GameFilters.filterByHomeGame(),
    ]).pipe(
      map(games => [...games].slice(0,3))
    );;

    this.gamesWithoutBarmen$ = this.gamesService
    .getAllGames([
      GameFilters.filterByHomeGame(),
      GameFilters.filterWithoutBarmen(),
    ]).pipe(
      map(games => [...games].slice(0,3))
    );

    let filterMyGame:IFilters<Game>[] = [];
    filterMyGame.push(GameFilters.filterByHomeGame());
    let barmanId = this.auth.getUserId();
    if(barmanId !== undefined) {
    filterMyGame.push(GameFilters.filterBarmenId(barmanId))
    }
    this.myGames$ = this.gamesService.getAllGames(filterMyGame).pipe(
      map(games => [...games].slice(0,3))
    );


    this.barmen$ = this.userService.getAllUsers().pipe(
      map(barmen => [...barmen].slice(0,3))
    );
  }

  onPlusGames(): void {
    this.changeTab.emit({tab:'games',filters:['Mes rencontres']});
  }

  onPlusBarmen(): void {
    this.changeTab.emit({tab:'barmen'});
  }

}
