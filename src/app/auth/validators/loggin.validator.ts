import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function logginValidator(login:string,password:string): ValidatorFn {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    if(!ctrl.get(login) && !ctrl.get(password)) {
      return {
        logginAndPasswordChecked: 'invalid control name'
      };
    }

    if(ctrl.get(login)!.value == 'sebastien.burckhardt@gmail.com') {
      return null
    } else {
      return {
        logginAndPasswordChecked: 'ERREUR'
      };
    }
  }
}
