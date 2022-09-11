import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-list-users-card',
  templateUrl: './list-users-card.component.html',
  styleUrls: ['./list-users-card.component.scss']
})
export class ListUsersCardComponent implements OnInit {

  @Input() user$!: Observable<User[]>;
  constructor() { }

  ngOnInit(): void {
  }

}
