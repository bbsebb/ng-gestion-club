import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { TableChipFilterComponent } from './components/table-chip-filter/table-chip-filter.component';
import { BetterDatePipe } from './pipes/better-date.pipe';



@NgModule({
  declarations: [
    TableChipFilterComponent,
    BetterDatePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    TableChipFilterComponent,
    BetterDatePipe
  ]
})
export class SharedModule { }
