import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {

  user$!: Observable<User>;
  img!:string;
  constructor(
    private userService: UserService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.img ='assets/shipa2.png';
    this.user$ = this.router.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      map((id) => {
        if (id) {
          return +id;
        } else {
          throw new Error();
        }
      }),
      switchMap(id => this.userService.getUserById(id))
    );
  }

}
