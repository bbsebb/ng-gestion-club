import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathNotFoundComponent } from './error404/path-not-found/path-not-found.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: 'bar', loadChildren: () => import('./bar/bar.module').then(m => m.BarModule) },
  { path: 'player', loadChildren: () => import('./player/player.module').then(m => m.PlayerModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', pathMatch: 'full', component: IndexComponent},
  { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
