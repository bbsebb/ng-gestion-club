import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import {map, catchError,of, Observable } from 'rxjs';
import { AuthenticationService } from "src/app/core/services/authentication.service";

export function logginValidator(auth: AuthenticationService,login:string,password:string): AsyncValidatorFn {
  return (ctrl: AbstractControl): Observable<ValidationErrors | null> => {
    if(!ctrl.get(login) && !ctrl.get(password)) {
      return of({
        logginAndPasswordChecked: 'invalid control name'
      });
    }

   /*  return auth.login(ctrl.get(login)!.value,ctrl.get(password)!.value).pipe(
      map(() =>  null),
      catchError(() => {return of({logginAndPasswordChecked: true});})
    ) */

    return auth.isLoggable(ctrl.get(login)!.value,ctrl.get(password)!.value).pipe(
      map((isLoggable) =>  {
        return (isLoggable)?null:{logginAndPasswordChecked: true};
      }),
      catchError(() => {return of({logginAndPasswordChecked: true});}))


  }
}
