import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleGameComponent } from '../shared/components/single-game/single-game.component';

import { SingleUserComponent } from '../shared/components/single-user/single-user.component';
import { BarSingleGameComponent } from './components/bar-single-game/bar-single-game.component';

import { BarComponent } from './components/bar/bar.component';




const routes: Routes = [
  { path: 'list-games/:id', component: BarSingleGameComponent },
  { path: 'list-barmen/:id', component: SingleUserComponent },
  { path: ':tab', component: BarComponent },
  { path: '', pathMatch:'full',  component: BarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarRoutingModule { }
