import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404RoutingModule } from './error404-routing.module';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';


@NgModule({
  declarations: [
    PathNotFoundComponent
  ],
  imports: [
    CommonModule,
    Error404RoutingModule
  ]
})
export class Error404Module { }
