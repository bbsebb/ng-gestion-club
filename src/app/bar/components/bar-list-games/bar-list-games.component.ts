import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {  BehaviorSubject, mergeMap, Observable, take, tap } from 'rxjs';
import { Filters, GameFilters, IFilters } from 'src/app/shared/models/filters.model';
import { IChips } from 'src/app/shared/models/chips.model';
import { Game } from 'src/app/core/models/game.model';
import { GamesService } from 'src/app/core/services/games.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { FilterService } from 'src/app/core/services/filter.service';


@Component({
  selector: 'app-bar-list-games',
  templateUrl: './bar-list-games.component.html',
  styleUrls: ['./bar-list-games.component.scss'],
})
export class BarListGamesComponent implements OnInit, AfterViewInit {
  @Input() chipsSelected$!:Observable<string[]>;
  chipsInfo: IChips<Game>[] = [
    {
      name: 'Mes rencontres',
      selected: false,
      filterInfo: GameFilters.filterBarmenId(this.auth.getUserId()),
    },
    {
      name: 'Prochain Week end',
      selected: false,
      filterInfo: GameFilters.filterByNextWE(),
    },
    {
      name: 'Rencontres datées',
      selected: true,
      filterInfo: GameFilters.filterByDated(),
    },
    {
      name: 'Sans barman',
      selected: false,
      filterInfo: GameFilters.filterWithoutBarmen(),
    }
  ];

  private _filters$:BehaviorSubject<IFilters<Game>[]> = new BehaviorSubject<IFilters<Game>[]>([]);
  get filters$():Observable<IFilters<Game>[]> {
    return this._filters$.asObservable();
  }


  dataSource = new MatTableDataSource<Game>();

  displayedColumns: string[] = ['day','competition','datetime', 'recevant','visiteur','nameHalle','city','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gamesService: GamesService,
     private router: Router,
      private auth:AuthenticationService,
      private filterService: FilterService) {}

  ngOnInit(): void {


    this.filters$.pipe(
      take(1),
      tap(filters => {
        filters.push(...this.filterDataFromChip());
        this._filters$.next(filters);
      })
    ).subscribe();

    this.chipsSelected$.pipe(
      tap(filters => {
        console.log(filters);
        this.chipsInfo.forEach(
          chip => {
            if(filters.includes(chip.name)) {
              chip.selected = true;
            }
          }
        );
      })
    ).subscribe();


    this.filterData().subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onChipFilter(chip: string): void {
    let chipFilters: {chipName:string, filtersInfo: IFilters<Game> } [] = [];
    for (const chipInfo of this.chipsInfo) {
      if(chip == chipInfo.name  ) {
        chipInfo.selected = !chipInfo.selected;
        if(chipInfo.selected) {
          chipFilters.push({chipName:chipInfo.name,filtersInfo:chipInfo.filterInfo});
        } else {
          chipFilters = chipFilters.filter(fi => fi.chipName != chipInfo.name);
        }
      }
    }
    this.filters$.pipe(
      take(1),
      tap(filters => {
        filters = chipFilters.map(chipFilter => chipFilter.filtersInfo);
        this._filters$.next(filters);
      })
    ).subscribe();
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

  private filterData(filtersInfo:IFilters<Game>[] = []): Observable<Game[]> {



    filtersInfo.push(Filters.filterByName<Game>('nameClubRec','hoenheim'));
    filtersInfo.push(...this.filterDataFromChip());

    this.filters$.pipe(
      take(1),
      tap(filters => {
        filters.push(...filtersInfo);
        this._filters$.next(filters);
      })
    ).subscribe();

    return this.filters$.pipe(
      tap(filters => console.log(filters)),
      mergeMap(filters =>
        this.gamesService.getAllGames(filters).pipe()
      ),
      //tap(games => console.log(games)),
      tap((games) => {
        this.dataSource.data = games;
      })
    );


    /* return this.gamesService.getAllGames().pipe(
      tap((games) => {
        this.dataSource.data = games;
      })
    ); */
  }

  private filterDataFromChip():IFilters<Game>[] {
    let initFilterChip:IFilters<Game>[] = [];
    this.chipsInfo.forEach(
      chip => {
        if(chip.selected) {
          initFilterChip.push(chip.filterInfo);
        };
      }
    )
    return initFilterChip;
  }

  private addFilters(...newFilters:IFilters<Game>[]):void {
    this.filters$.pipe(
      take(1),
      tap(filters => {
        filters.push(...newFilters);
        this._filters$.next(filters);
      })
    ).subscribe();
  }



  private removeFilter(newFilters:IFilters<Game>):void {
    this.filters$.pipe(
      take(1),
      tap(filters => {
        filters = filters.filter(filter =>
          filter.filterFn != newFilters.filterFn
          && filter.nameField != newFilters.nameField);
        this._filters$.next(filters);
      })
    ).subscribe();
  }
}

