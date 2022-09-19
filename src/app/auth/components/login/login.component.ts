import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { of, catchError, delay, tap, map, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { logginValidator } from '../../validators/loggin.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;
  showErrorLoggin$!: Observable<boolean>;
  showErrorServer: boolean = false;
  mode:ProgressBarMode = 'determinate';
  value:number = 0;
  loading:boolean = false;

  constructor(
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.emailCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(4),
      Validators.email,
    ]);
    this.passwordCtrl = this.formBuilder.control('', Validators.required);

    this.formLogin = this.formBuilder.group(
      {
        email: this.emailCtrl,
        password: this.passwordCtrl,
      },
      {
        asyncValidators: [logginValidator(this.auth,'email', 'password')],
        updateOn: 'blur',
      }
    );

    this.showErrorLoggin$ = this.formLogin.statusChanges.pipe(
      map(
        (status) =>
          status === 'INVALID' &&
          this.emailCtrl.value &&
          this.passwordCtrl.value
      )
    );
  }

  getFormControlErrorText(ctrl: AbstractControl): string {
    let rtr = 'Erreur inconnu';
    if (ctrl.hasError('required')) {
      rtr = 'Ce champs est requis !';
    } else if (ctrl.hasError('minlength')) {
      rtr = 'Votre email doit avoir au moins 4 caractères';
    } else if (ctrl.hasError('email')) {
      rtr = `Ce n'est pas un email !`;
    } else {
      rtr = 'erreur inconnu';
    }
    return rtr;
  }

  onLoggin(): void {
    if (this.formLogin.valid) {
      this.startProgressBar();
      this.auth
        .login(this.formLogin.value.email, this.formLogin.value.password)
        .pipe(
          delay(2000),
          tap(() => this.stopProgressBar()),
          tap(() => this.router.navigateByUrl('/')),
          catchError((error) => {
            console.log(error);
            this.showErrorServer = true;
            this.stopProgressBar();
            this.passwordCtrl.reset();
            return of({});
          })
        )
        .subscribe();
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  startProgressBar() {
    this.loading = true;
    this.mode = 'indeterminate';
    this.value = 30;
  }

  stopProgressBar() {
    this.loading = false;
    this.mode = 'determinate';
    this.value = 0;
  }
}
