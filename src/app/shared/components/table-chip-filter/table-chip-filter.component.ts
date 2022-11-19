import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatChip,
  MatChipList,
  MatChipListChange,
  MatChipSelectionChange,
} from '@angular/material/chips';
import { filter, map, Observable, tap } from 'rxjs';
import { IChips } from '../../models/chips.model';

@Component({
  selector: 'app-table-chip-filter',
  templateUrl: './table-chip-filter.component.html',
  styleUrls: ['./table-chip-filter.component.scss'],
})
export class TableChipFilterComponent implements OnInit {
  @Input() chips!: Observable<IChips<any>[]>;
  @Output() eventChipFilter: EventEmitter<{name:string,selected:boolean}> = new EventEmitter<
  {name:string,selected:boolean}
  >();

  @ViewChild(MatChipList, { static: false }) matChipList!: MatChipList;

  constructor() {}
  ngOnInit(): void {

  }

  onChipFilter(chip: MatChip): void {

    this.eventChipFilter.emit({name:chip.value,selected:chip.selected})
  }




}
