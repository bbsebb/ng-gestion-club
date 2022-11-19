import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';


@Component({
  selector: 'app-list-games-card',
  templateUrl: './list-games-card.component.html',
  styleUrls: ['./list-games-card.component.scss'],
})
export class ListGamesCardComponent implements OnInit {
  @Input() gamesInput$!: Observable<Game[]>;
  @Input() displayNumber?:number = 3;
  games$!: Observable<Game[]>;

  constructor() {}

  ngOnInit(): void {
   this.games$ = this.gamesInput$.pipe(map((games) => [...games].slice(0, this.displayNumber)));
  }
}
