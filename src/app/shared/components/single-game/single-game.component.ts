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
  game$!: Observable<Game>;

  displayAddInfo: boolean = false;
  iconeDisplayAddInfo: string = 'add';

  constructor(
    private gamesService: GamesService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
   this.game$ = this.router.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      map((id) => {
        if (id) {
          return +id;
        } else {
          throw new Error();
        }
      }),
      switchMap(id => this.gamesService.getGameById(id))
    );
  }

  onDisplayAddInfo(): void {
    this.displayAddInfo = !this.displayAddInfo;
    this.iconeDisplayAddInfo = this.displayAddInfo ? 'remove' : 'add';
  }
}
