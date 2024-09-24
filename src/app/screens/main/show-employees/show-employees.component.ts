import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Alerts } from 'src/app/items/alerts';
import { EmployeeInfoItem, GenericItem } from 'src/app/models';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PuestoService } from 'src/app/services/puesto.service';

@Component({
  selector: 'app-show-eployees',
  templateUrl: './show-employees.component.html',
  styleUrls: ['./show-employees.component.css']
})
export class ShowEmployeesComponent implements OnInit {
  formFilter!: FormGroup;
  puestos: GenericItem[] = []
  departamentos: GenericItem[] = []
  empleados: EmployeeInfoItem[] = []

  constructor(
    private puestoService: PuestoService,
    private departamentoService: DepartamentoService,
    private employeeService: EmployeeService,
    private alertas: Alerts
  ) { }

  ngOnInit() {
    this.getDepartamentos()
    this.getPuestosList()
    this.getEmployees()
    this.formFilter = new FormGroup({
      name: new FormControl('', Validators.required),
      firstSurname: new FormControl('', Validators.required),
      secondSurname: new FormControl('', Validators.required),
      curp: new FormControl('', Validators.required),
      departamento_id: new FormControl('', Validators.required),
      puesto_id: new FormControl('', Validators.required),
    });
  }

  getDepartamentos() {
    this.departamentoService.getDepartments()
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
        this.departamentos = data;
      })
  }

  getPuestosList() {
    this.puestoService.getPuestos()
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

  getEmployees() {
    this.employeeService.getEmployess()
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
      .subscribe((data: EmployeeInfoItem[]) => {
        this.empleados = data;
      })
  }

  filterEmployee(empleados: EmployeeInfoItem[] | undefined, _formFilter: FormGroup): EmployeeInfoItem[] {
    let name = _formFilter.get('name')?.value
    let firstSurname = _formFilter.get('firstSurname')?.value
    let secondSurname = _formFilter.get('secondSurname')?.value
    let curp = _formFilter.get('curp')?.value
    let departamento = this.departamentos.find(department => _formFilter.get('departamento_id')?.value == department.id)
    let puesto = this.puestos.find(puesto => _formFilter.get('puesto_id')?.value == puesto.id)

    if ((name.length >= 3 || firstSurname.length >= 3 || secondSurname.length >= 3 || curp.length >= 3 || departamento || puesto) && empleados) {
      return empleados.filter(
        (empleado) =>
          empleado.fullName.toLowerCase().includes(name.toLowerCase()) &&
          empleado.fullName.toLowerCase().includes(firstSurname.toLowerCase()) &&
          empleado.fullName.toLowerCase().includes(secondSurname.toLowerCase()) &&
          empleado.departamento.toLowerCase().includes(secondSurname.toLowerCase()) &&
          empleado.puesto.toLowerCase().includes(secondSurname.toLowerCase()) 
      );
    } else if (empleados) {
      return empleados;
    }
    return [];
  }

  get nameControl(): FormControl {
    return this.formFilter.get('name') as FormControl;
  }

  get firstSurnameControl(): FormControl {
    return this.formFilter.get('firstSurname') as FormControl;
  }

  get secondSurnameControl(): FormControl {
    return this.formFilter.get('secondSurname') as FormControl;
  }

  get curpControl(): FormControl {
    return this.formFilter.get('curp') as FormControl;
  }

  get departamentoControl(): FormControl {
    return this.formFilter.get('departamento_id') as FormControl;
  }

  get puestoControl(): FormControl {
    return this.formFilter.get('puesto_id') as FormControl;
  }
}
