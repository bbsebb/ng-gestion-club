import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { TableChipFilterComponent } from './components/table-chip-filter/table-chip-filter.component';
import { BetterDatePipe } from './pipes/better-date.pipe';
import { SingleGameComponent } from './components/single-game/single-game.component';
import { ClubNamePipe } from './pipes/club-name.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import { GluePipe } from './pipes/glue.pipe';
import { NullSubstitutionPipe } from './pipes/null-substitution.pipe';

import { RouterModule } from '@angular/router';
import { SingleUserComponent } from './components/single-user/single-user.component';
import { ListUsersCardComponent } from './components/list-users-card/list-users-card.component';
import { AvatarDirective } from './directives/avatar.directive';
import { ListGamesCardComponent } from './components/list-games-card/list-games-card.component';
import { CompetitionPipe } from './pipes/competition.pipe';



@NgModule({
  declarations: [
    TableChipFilterComponent,
    BetterDatePipe,
    SingleGameComponent,
    ClubNamePipe,
    GluePipe,
    NullSubstitutionPipe,
    ListGamesCardComponent,
    SingleUserComponent,
    ListUsersCardComponent,
    AvatarDirective,
    CompetitionPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    LayoutModule
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    TableChipFilterComponent,
    BetterDatePipe,
    SingleGameComponent,
    ClubNamePipe,
    GluePipe,
    CompetitionPipe,
    NullSubstitutionPipe,
    ListGamesCardComponent,
    SingleUserComponent,
    ListUsersCardComponent,
    AvatarDirective
  ]
})
export class SharedModule { }
