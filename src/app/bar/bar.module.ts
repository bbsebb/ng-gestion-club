import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarRoutingModule } from './bar-routing.module';
import { BarComponent } from './components/bar/bar.component';
import { SharedModule } from '../shared/shared.module';
import { ListGamesComponent } from './components/list-games/list-games.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { SingleUserComponent } from '../shared/components/single-user/single-user.component';




@NgModule({
  declarations: [
    BarComponent,
    ListGamesComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    BarRoutingModule,
    SharedModule
  ]

})
export class BarModule { }
