import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleGameComponent } from '../shared/components/single-game/single-game.component';
import { BarComponent } from './components/bar/bar.component';
import { ListGamesComponent } from './components/list-games/list-games.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

import { SingleUserComponent } from '../shared/components/single-user/single-user.component';



const routes: Routes = [
  { path: 'list-games', component: ListGamesComponent },
  { path: 'list-games/:id', component: SingleGameComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'list-users/:id', component: SingleUserComponent },
  { path: '', component: BarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarRoutingModule { }
