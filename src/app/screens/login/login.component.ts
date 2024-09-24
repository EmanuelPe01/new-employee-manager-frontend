import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Alerts } from 'src/app/items/alerts';
import { SessionInfo } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin!: FormGroup;
  flagShowPass: boolean;
  
  constructor(
    private alerts: Alerts,
    private authService: AuthService,
    private router: Router
  ) {
    this.flagShowPass = false;
  }

  ngOnInit() {
    if(this.authService.getToken() != '')
      this.router.navigate(["/"]);
    this.formLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get emailControl(): FormControl {
    return this.formLogin.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.formLogin.get('password') as FormControl;
  }

  logIn() {
    this.authService.authenticate(this.formLogin.value)
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 404:
                this.alerts.showErrorMessage(error.error.message);
                break
              case 401:
                this.alerts.showToast('error', 'Usuario y/o contraseña incorrectos')
                break
            }
          } else {
            this.alerts.showErrorMessage("Error de conexión");
          }
          return throwError(() => new Error("Login failed"));
        })
      ).subscribe(
        (data: SessionInfo) => {
          this.authService.setToken(data.token)
          this.authService.setName(data.nombre)
          this.authService.setEmail(data.email)
          this.authService.setRole(data.rol)
          this.alerts.showToast('success', 'Inicio de sesión exitoso')
          this.router.navigate(["/"]);
        }
      )
  }
}
