import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, of, Subject, take, tap } from 'rxjs';
import { ChipFilters, IChipFilters } from 'src/app/shared/models/chip-filters.model';
import { IChips } from 'src/app/shared/models/chips.model';
import { Game } from 'src/app/shared/models/game.model';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss'],
})
export class ListGamesComponent implements OnInit, AfterViewInit {
  chipsInfo: IChips<Game>[] = [
    {
      name: 'Test id = 5',
      selected: false,
      filterInfo: {
        nameField: 'barmans',
        filterFn: (name: {id:number}[]) =>  name.some(barman => barman.id == 5)
      },
    },
    {
      name: 'Test Hoenheim sur recevant',
      selected: false,
      filterInfo: ChipFilters.filterByName<Game>('nameClubRec','hoenheim'),
    },
    {
      name: 'Test new WE',
      selected: false,
      filterInfo: ChipFilters.filterByNextWE<Game>('datetime'),
    }
  ];

  chipFilters: {chipName:string, filtersInfo: IChipFilters<Game> } [] = [];

  dataSource = new MatTableDataSource<Game>();

  displayedColumns: string[] = ['competition','day','datetime', 'recevant','visiteur','nameHalle','city'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.filterData().subscribe();

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onChipFilter(chip: string): void {

    for (const chipInfo of this.chipsInfo) {
      if(chip == chipInfo.name  ) {
        chipInfo.selected = !chipInfo.selected;
        if(chipInfo.selected) {
          this.chipFilters.push({chipName:chipInfo.name,filtersInfo:chipInfo.filterInfo});
        } else {
          this.chipFilters = this.chipFilters.filter(fi => fi.chipName != chipInfo.name);
        }
      }
    }
    this.filterData(this.chipFilters.map(filtersInfoArray => filtersInfoArray.filtersInfo)).subscribe();
  }

  private filterData(filtersInfo?:IChipFilters<Game>[]): Observable<Game[]> {

    return this.gamesService.getAllGames(filtersInfo).pipe(
      tap((games) => {
        this.dataSource.data = games;
      })
    );
  }
}

