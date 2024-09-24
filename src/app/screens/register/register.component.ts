import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericItem } from 'src/app/models';
import { EstadoService } from 'src/app/services/estado.service';
import { PuestoService } from 'src/app/services/puesto.service';
import { Alerts } from 'src/app/items/alerts';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  estados: GenericItem[] = []
  puestos: GenericItem[] = []

  constructor(
    private estadoService: EstadoService,
    private puestoService: PuestoService,
    private authService: AuthService,
    private alertas: Alerts,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPuestosList()
    this.getStatesList()
    this.formRegister = new FormGroup({
      name: new FormControl('', Validators.required),
      firstSurname: new FormControl('', Validators.required),
      secondSurname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      curp: new FormControl('', Validators.required),
      puesto_id: new FormControl('', Validators.required),
      estado_id: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rol: new FormControl('ADMIN', Validators.required)
    });
  }

  register() {
    this.alertas.showLoadingMessage(true)
    setTimeout(() => {
      this.authService.registerEmployee(this.formRegister.value)
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            console.log(error.message)
            if (error.status)
              this.alertas.showErrorMessage(`Error con código ${error.status}`)
          }
          return throwError(() => new Error("Register Failed"));
        })
      )
      .subscribe(
        (data) => {
          this.alertas.showLoadingMessage(false)
          this.alertas.showToast("success", data)
          this.router.navigate(["/auth"]);
        }
      )
    }, 1000)
  }

  getStatesList() {
    this.estadoService.getAuthEstados()
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            console.log(error.message)
            if (error.status)
              this.alertas.showErrorMessage(`Error con código ${error.status}`)
          }
          return throwError(() => new Error("Load information Failed"));
        })
      )
      .subscribe((data: GenericItem[]) => {
        this.estados = data;
      })
  }

  getPuestosList() {
    this.puestoService.getAuthPuestos()
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            console.log(error.message)
            if (error.status)
              this.alertas.showErrorMessage(`Error con código ${error.status}`)
          }
          return throwError(() => new Error("Load information Failed"));
        })
      )
      .subscribe((data: GenericItem[]) => {
        this.puestos = data;
      })
  }

  get nameControl(): FormControl {
    return this.formRegister.get('name') as FormControl;
  }

  get firstSurnameControl(): FormControl {
    return this.formRegister.get('firstSurname') as FormControl;
  }

  get secondSurnameControl(): FormControl {
    return this.formRegister.get('secondSurname') as FormControl;
  }

  get emailControl(): FormControl {
    return this.formRegister.get('email') as FormControl;
  }

  get curpControl(): FormControl {
    return this.formRegister.get('curp') as FormControl;
  }

  get puestoControl(): FormControl {
    return this.formRegister.get('puesto_id') as FormControl;
  }

  get estadoControl(): FormControl {
    return this.formRegister.get('estado_id') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.formRegister.get('password') as FormControl;
  }
}
