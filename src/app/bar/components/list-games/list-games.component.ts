import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, of, tap } from 'rxjs';
import { Game } from 'src/app/shared/models/game.model';
import { GamesService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss'],
})
export class ListGamesComponent implements OnInit, AfterViewInit {
  chipsInfo: IChips[] = [
    { name: 'Mes créneaux', nameField: 'id', filter: '5', selected: false },
    {
      name: 'Créneaux libre',
      nameField: 'nameClubRec',
      filter: 'Hoenheim',
      selected: false,
    },
  ];

  dataSource = new MatTableDataSource<Game>();
  games$!: Observable<Game[]>;

  displayedColumns: string[] = ['visiteur', 'recevant'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.createFilter(this.chipsInfo);
    this.games$ = this.gamesService.getAllGames().pipe(
      tap((games) => {
        this.dataSource.data = games;
      })
    );
    this.games$.subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onClick(chip: MatChip): void {
    for (const chipInfo of this.chipsInfo) {
      if (chip.value === chipInfo.name) {
        chipInfo.selected = !chipInfo.selected;
      }
    }
    console.table(this.chipsInfo);
    this.updateFilter();
    chip.toggleSelected();
  }

  createFilter(filtersInfo: IChips[]) {
    let filterFunction = (data: any, filter: string): boolean => {
      let flag = true;
      filtersInfo.forEach((chips) => {
        if(chips.selected) {
        flag = flag && (
          data[chips.nameField]
            .toString()
            .trim()
            .toLocaleLowerCase()==chips.filter.trim()
            .toLocaleLowerCase());
    }});
      return flag;
    };
    return filterFunction;
  }

  updateFilter():void {
    this.dataSource.filter = 'update';
  }
}



interface IChips {
  name: string;
  nameField: string;
  filter: string;
  selected: boolean;
}
