import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarRoutingModule } from './bar-routing.module';

import { SharedModule } from '../shared/shared.module';
import { BarListGamesComponent } from './components/bar-list-games/bar-list-games.component';
import { BarListUsersComponent } from './components/bar-list-users/bar-list-users.component';
import { BarControlPanelComponent } from './components/bar-control-panel/bar-control-panel.component';
import { BarComponent } from './components/bar/bar.component';
import { BarSingleGameComponent } from './components/bar-single-game/bar-single-game.component';





@NgModule({
  declarations: [
    BarControlPanelComponent,
    BarListGamesComponent,
    BarListUsersComponent,
    BarComponent,
    BarSingleGameComponent
  ],
  imports: [
    CommonModule,
    BarRoutingModule,
    SharedModule
  ]

})
export class BarModule { }
