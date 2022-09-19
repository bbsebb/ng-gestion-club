import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { IChips } from '../../models/chips.model';

@Component({
  selector: 'app-table-chip-filter',
  templateUrl: './table-chip-filter.component.html',
  styleUrls: ['./table-chip-filter.component.scss'],
})
export class TableChipFilterComponent {
  @Input() chips!: IChips<any>[];
  @Output() eventChipFilter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {

  }

  onChipFilter(chip: MatChip): void {
    chip.toggleSelected();
    this.eventChipFilter.emit(chip.value);
  }
}
