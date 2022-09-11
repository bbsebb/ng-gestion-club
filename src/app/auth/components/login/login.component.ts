import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { catchError, tap, map, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { logginValidator } from '../../validators/loggin.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  emailCtrl!:FormControl;
  passwordCtrl!:FormControl;
  showErrorLoggin$!:Observable<boolean>;

  constructor(private auth:AuthenticationService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.emailCtrl = this.formBuilder.control('',[Validators.required,Validators.minLength(4)]);
    this.passwordCtrl = this.formBuilder.control('',Validators.required);

   this.formLogin = this.formBuilder.group({
    email: this.emailCtrl,
    password: this.passwordCtrl,
   }, {
    Validators: [logginValidator('email','password')],
    updateOn:'blur'
   } as FormControlOptions)

   this.showErrorLoggin$ = this.formLogin.statusChanges.pipe(
    tap(() => console.log(this.emailCtrl.value)),
    tap(() => console.log(this.passwordCtrl.value)),
    tap((status) => console.log(status)),
    map(status => status === 'INVALID' && this.emailCtrl.value && this.passwordCtrl.value),
   )
  }

  getFormControlErrorText(ctrl: AbstractControl):string {
    let rtr = 'Erreur inconnu';
    if(ctrl.hasError('required')) {
      rtr = 'Ce champs est requis !'
    } else if(ctrl.hasError('minlength')) {
      rtr = 'taille'
    }
    return rtr;
  }

}
