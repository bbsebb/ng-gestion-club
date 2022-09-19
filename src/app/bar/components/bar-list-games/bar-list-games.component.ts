import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {  Observable, tap } from 'rxjs';
import { Filters, GameFilters, IFilters } from 'src/app/shared/models/filters.model';
import { IChips } from 'src/app/shared/models/chips.model';
import { Game } from 'src/app/core/models/game.model';
import { GamesService } from 'src/app/core/services/games.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';


@Component({
  selector: 'app-bar-list-games',
  templateUrl: './bar-list-games.component.html',
  styleUrls: ['./bar-list-games.component.scss'],
})
export class BarListGamesComponent implements OnInit, AfterViewInit {
  @Input() filters$!:Observable<string[]>;
  chipsInfo: IChips<Game>[] = [
    {
      name: 'Mes rencontres',
      selected: false,
      filterInfo: GameFilters.filterBarmenId(this.auth.getUserId()),
    },
    {
      name: 'prochain Week end',
      selected: false,
      filterInfo: GameFilters.filterByNextWE('datetime'),
    },
    {
      name: 'Rencontres datées',
      selected: true,
      filterInfo: GameFilters.filterByDated(),
    }
  ];

  chipFilters: {chipName:string, filtersInfo: IFilters<Game> } [] = [];

  dataSource = new MatTableDataSource<Game>();

  displayedColumns: string[] = ['day','competition','datetime', 'recevant','visiteur','nameHalle','city','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gamesService: GamesService, private router: Router, private auth:AuthenticationService) {}

  ngOnInit(): void {


    let initFilterChip:IFilters<Game>[] = []

    this.filters$.pipe(
      tap(filters => {
        this.chipsInfo.forEach(
          chip => {
            if(filters.includes(chip.name)) {
              chip.selected = true;
            }
          }
        );
      })
    ).subscribe();

    this.chipsInfo.forEach(
      chip => {
        if(chip.selected) {
          initFilterChip.push(chip.filterInfo);
        };
      }
    )
    this.filterData(initFilterChip).subscribe();
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



  onSingleGame(id : number): void {
    this.router.navigateByUrl(`/bar/list-games/${id}`);
  }
  onAddBarman(id : number): void {
    this.gamesService.addBarman(id).subscribe();
  }
  onRemoveBarman(id : number): void {
    this.gamesService.removeBarman(id).subscribe();
  }

  private filterData(filtersInfo:IFilters<Game>[]): Observable<Game[]> {

    filtersInfo.push(Filters.filterByName<Game>('nameClubRec','hoenheim'));
    return this.gamesService.getAllGames(filtersInfo).pipe(
      tap((games) => {
        this.dataSource.data = games;
      })
    );
  }
}

