import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';


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
