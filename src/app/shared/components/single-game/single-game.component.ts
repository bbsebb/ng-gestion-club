import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Game } from '../../models/game.model';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-single-game',
  templateUrl: './single-game.component.html',
  styleUrls: ['./single-game.component.scss'],
})
export class SingleGameComponent implements OnInit {
  game$!: Observable<Game>;
  game!: Game;

  displayAddInfo: boolean = false;
  iconeDisplayAddInfo: string = 'add';

  constructor(
    private gamesService: GamesService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.table(this.router.snapshot.parent);

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
    this.game$.subscribe((game) => (this.game = game));
  }

  onDisplayAddInfo(): void {
    this.displayAddInfo = !this.displayAddInfo;
    this.iconeDisplayAddInfo = this.displayAddInfo ? 'remove' : 'add';
  }
}
