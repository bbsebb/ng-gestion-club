import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { GamesService } from 'src/app/core/services/games.service';
import { Game } from '../../../core/models/game.model';

@Component({
  selector: 'app-single-game',
  templateUrl: './single-game.component.html',
  styleUrls: ['./single-game.component.scss'],
})
export class SingleGameComponent implements OnInit {

  @Input() game$!: Observable<Game>;
  displayAddInfo: boolean = false;
  iconeDisplayAddInfo: string = 'add';

  constructor(
  ) {}

  ngOnInit(): void {


  }

  onDisplayAddInfo(): void {
    this.displayAddInfo = !this.displayAddInfo;
    this.iconeDisplayAddInfo = this.displayAddInfo ? 'remove' : 'add';
  }
}
