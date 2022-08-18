import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Game } from 'src/app/shared/models/game.model';
import { GamesService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss']
})
export class ListGamesComponent implements OnInit,  AfterViewInit {

  public dataSource = new MatTableDataSource<Game>();
  games$!: Observable<Game[]>;
  games!:Game[];
  displayedColumns: string[] = ['visiteur', 'recevant'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.getAllGames().pipe(
      map(games => games.filter(game => game.id === 2))
    ).subscribe((games)=> {
      console.table(games);
      this.dataSource.data = games;
    })
  }

 ngAfterViewInit():void {
  this.dataSource.paginator = this.paginator;
 }

}

