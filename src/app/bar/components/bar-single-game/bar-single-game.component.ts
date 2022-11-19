import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  map,
  Observable
} from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { GamesBarService } from '../../services/games-bar.service';
import {GamesService} from "../../../core/services/games.service";

@Component({
  selector: 'app-bar-single-game',
  templateUrl: './bar-single-game.component.html',
  styleUrls: ['./bar-single-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarSingleGameComponent implements OnInit {
  game$!: Observable<Game>;
  barmen$!: Observable<User[]>;
  idGame!:number;

  constructor(
    private gamesService: GamesService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          if (params['id']) {
            return params['id'];
          } else {
            throw new Error();
          }
        })
      )
      .subscribe((idGame) => {

        this.game$ = this.gamesService.getGameById(idGame);
        this.idGame = idGame;
      });
  }




  onAddBarman(): void {

  }
  onRemoveBarman(): void {

  }

  onAddOrRemoveBarman(action: string) {

  }

  onBack(): void {
    this.router.navigate(['bar', 'games']);
  }
}
