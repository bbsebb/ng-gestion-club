
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-auth-info',
  templateUrl: './auth-info.component.html',
  styleUrls: ['./auth-info.component.scss']
})
export class AuthInfoComponent implements OnInit {

  isLoggin$!:Observable<boolean>;
  constructor(private authService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggin$ = this.authService.isLogged();
    this.authService.userApp$.subscribe(
      //(user) => console.log(user)
    )
  }

  onLogout():void {
    this.authService.loggout();
    this.router.navigateByUrl('/')
  }

  onRegister():void  {
    this.router.navigateByUrl('/auth/register')
  }

  onLogin():void  {
    this.router.navigateByUrl('/auth/login')
  }

}
