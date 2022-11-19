import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarRoutingModule } from './bar-routing.module';

import { SharedModule } from '../shared/shared.module';


import { BarComponent } from './components/bar/bar.component';
import { BarSingleGameComponent } from './components/bar-single-game/bar-single-game.component';
import { GamesBarService } from './services/games-bar.service';
import { BarSingleBarmanComponent } from './components/bar-single-barman/bar-single-barman.component';
import { BarmanService } from './services/barman.service';
import { BarControlPanelComponent } from './components/bar/bar-control-panel/bar-control-panel.component';
import { BarSingleGameActionsComponent } from './components/bar-single-game/bar-single-game-actions/bar-single-game-actions.component';
import { BarListGamesComponent } from './components/bar/bar-list-games/bar-list-games.component';
import { BarListUsersComponent } from './components/bar/bar-list-users/bar-list-users.component';





@NgModule({
  declarations: [
    BarControlPanelComponent,
    BarListGamesComponent,
    BarListUsersComponent,
    BarComponent,
    BarSingleGameComponent,
    BarSingleBarmanComponent,
    BarSingleGameActionsComponent
  ],
  imports: [
    CommonModule,
    BarRoutingModule,
    SharedModule
  ],
  providers: [
    GamesBarService,
    BarmanService
  ]

})
export class BarModule { }
