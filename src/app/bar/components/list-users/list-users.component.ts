import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { IChips } from 'src/app/shared/models/chips.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit,AfterViewInit {

  chipsInfo: IChips<User>[] = [];
  dataSource = new MatTableDataSource<User>();

  displayedColumns: string[] = ['avatar','name','forename','email', 'tel'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllUsers().pipe(
      tap((users) => {
        this.dataSource.data = users;
      })
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onClick(id : number): void {
    this.router.navigateByUrl(`/bar/list-users/${id}`);
  }

  onChipFilter(chip: string): void {


  }
}
