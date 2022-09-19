import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { GamesService } from 'src/app/core/services/games.service';

@Component({
  selector: 'app-bar-single-game',
  templateUrl: './bar-single-game.component.html',
  styleUrls: ['./bar-single-game.component.scss']
})
export class BarSingleGameComponent implements OnInit {
  game$!: Observable<Game>;
  constructor(private gamesService: GamesService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.game$ = this.route.paramMap.pipe(
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

  onBack():void {
    this.router.navigate(['bar','games'])
  }

}
