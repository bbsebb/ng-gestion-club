import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {  Observable, tap } from 'rxjs';
import { Filters, GameFilters, IFilters } from 'src/app/shared/models/filters.model';
import { IChips } from 'src/app/shared/models/chips.model';
import { Game } from 'src/app/core/models/game.model';
import { GamesService } from 'src/app/core/services/games.service';


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
        nameField: 'barmen',
        filterFn: (name: {id:number}[]) =>  name.some(barman => barman.id == 5)
      },
    },
    {
      name: 'Test Hoenheim sur recevant',
      selected: false,
      filterInfo: Filters.filterByName<Game>('nameClubRec','hoenheim'),
    },
    {
      name: 'Test new WE',
      selected: false,
      filterInfo: GameFilters.filterByNextWE('datetime'),
    }
  ];

  chipFilters: {chipName:string, filtersInfo: IFilters<Game> } [] = [];

  dataSource = new MatTableDataSource<Game>();

  displayedColumns: string[] = ['day','competition','datetime', 'recevant','visiteur','nameHalle','city'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gamesService: GamesService, private router: Router) {}

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

  onClick(id : number): void {
    this.router.navigateByUrl(`/bar/list-games/${id}`);
  }

  private filterData(filtersInfo?:IFilters<Game>[]): Observable<Game[]> {

    return this.gamesService.getAllGames(filtersInfo).pipe(
      tap((games) => {
        this.dataSource.data = games;
      })
    );
  }
}

