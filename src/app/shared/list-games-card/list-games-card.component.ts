import { Component, Input, OnInit } from '@angular/core';
import { filter, map, Observable, take } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { GamesService } from 'src/app/core/services/games.service';
import { GameFilters, IFilters } from '../models/filters.model';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-list-games-card',
  templateUrl: './list-games-card.component.html',
  styleUrls: ['./list-games-card.component.scss'],
})
export class ListGamesCardComponent implements OnInit {
  @Input() games$!: Observable<Game[]>;



  constructor() {}

  ngOnInit(): void {

  }
}
