import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap,of,throwError, BehaviorSubject, catchError, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { UserApp } from '../models/userApp.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
    userApp$!:Observable<User | undefined>;
    private _userApp$: BehaviorSubject<User | undefined>;


  constructor(private http:HttpClient) {
    const  userAppLocalStorage = localStorage.getItem('userApp');
    const userApp = ((userAppLocalStorage)? JSON.parse(userAppLocalStorage): undefined )
    this._userApp$ =  new BehaviorSubject<User | undefined>(userApp );
    this.userApp$ = this._userApp$.asObservable();
  }

  login(login:string, password: string): Observable<User> {
    return this.http.get<User[]>(`${environment.urlServer}/users`).pipe(
      catchError(() => {throw new Error('Erreur de connexion au serveur')}),
      map(
        (users) => this.authentication(users, login, password)
      ),
      tap(userFound => this._userApp$.next(userFound)),
      tap(userFound => localStorage.setItem('userApp',JSON.stringify(userFound)))
    )
  }

  private authentication(users:User[],login:string, password: string):User {
    let userFund = users.find(user => user.email == login && user.password == password);
          if(userFund) {
            return userFund;
          } else {
            throw new Error('mot de passe ou login éronné');
          }

  }

  isLogged(): Observable<boolean> {
    return this.userApp$.pipe(
      map((user) => {
        if(user) {
          return true;
        } else {
          return false;
        }
      })
    )
  }

  hasRole(role:string):Observable<boolean> {
    return this.userApp$.pipe(
      map((user) => {
        if(user) {
          if(user.roles.some((roleSearched) => roleSearched.role == role)) {
            return true;
          } else {
            return false
          }
        } else {
          throw new Error('Utilisateur non loggé');
        }
      })
    )
  }

}
