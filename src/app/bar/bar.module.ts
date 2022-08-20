import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarRoutingModule } from './bar-routing.module';
import { BarComponent } from './components/bar/bar.component';
import { SharedModule } from '../shared/shared.module';
import { ListGamesComponent } from './components/list-games/list-games.component';
import { SingleGameComponent } from './components/single-game/single-game.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { SingleUserComponent } from './components/single-user/single-user.component';
import { GamesService } from './services/games.service';



@NgModule({
  declarations: [
    BarComponent,
    ListGamesComponent,
    SingleGameComponent,
    ListUsersComponent,
    SingleUserComponent
  ],
  imports: [
    CommonModule,
    BarRoutingModule,
    SharedModule
  ],
  providers: [GamesService]
})
export class BarModule { }
