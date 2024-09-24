import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError, throwError } from "rxjs";
import { Alerts } from "src/app/items/alerts";
import { GenericItem } from "src/app/models";
import { DepartamentoService } from "src/app/services/departamento.service";
import Swal from "sweetalert2";

@Component({
    template: `
        <div class="container">
            <div class="card">
                <div class="card-header">
                    Filtro de busqueda
                </div>
                <div class="card-body text-center">
                    <div class="row">
                        <div class="col col-1"></div>
                        <div class="col col-10">
                            <custom-input [placeHolder]="'Nombre del departamento'" [type]="'text'" [control]="nameControl"
                            ></custom-input>
                        </div>
                        <div class="col col-1"></div>
                    </div>
                </div>
            </div>
            <div class="row m-3">
                <form (ngSubmit)="saveItem()" [formGroup]="formNewItem">
                    <div class="row align-items-center">
                        <div class="col col-8">
                            <custom-input placeHolder="Nuevo departamento" type="text" [control]="nameNewControl"></custom-input>
                        </div>    
                        <div class="col col-4">
                            <button class="btn btn-dark"><i class="fa-solid fa-plus"></i>Agregar</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="row mt-3">
                <div class="table-responsive-xl">
                    <table class="table table-hover">
                        <thead>
                            <th scope="col">Nombre</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr
                                *ngFor="let departamento of filter(departamentos, formFilter)">
                                <td>{{ departamento.nombre }}</td>
                                <td>{{ departamento.estado }}</td>
                                <td>
                                    <div class="container">
                                        <div class="row">
                                            <div class="col">
                                                <button class="btn btn-danger" (click)="deleteDepartmen(departamento.nombre, departamento.id)">
                                                    <i class="fa-solid fa-user-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
})

export class DepartmentsComponent implements OnInit {
    formFilter!: FormGroup
    formNewItem!: FormGroup
    departamentos: GenericItem[] = []

    constructor(
        private departmentService: DepartamentoService,
        private alertas: Alerts
    ) { }

    ngOnInit(): void {
        this.getDepartmentList()
        this.formFilter = new FormGroup({
            name: new FormControl('', Validators.required),
        });
        this.formNewItem = new FormGroup({
            nombre: new FormControl('', Validators.required),
            state: new FormControl(true)
        });
    }

    getDepartmentList() {
        this.departmentService.getDepartments()
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

    deleteDepartmen(name: string, id: string) {
        Swal.fire({
            title: "¿Estas seguro?",
            text: `Se eliminará a ${name}` ,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#6E1300",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              this.alertas.showLoadingMessage(true, 'Eliminando')
              setTimeout(() => {
                this.departmentService.deleteDepartment(id).
                pipe(
                  catchError((error) => {
                    if (error instanceof HttpErrorResponse) {
                      console.log(error.message)
                      if (error.status)
                        this.alertas.showErrorMessage(`Error con código ${error.status}`)
                    }
                    return throwError(() => new Error("Delete Failed"));
                  })
                ).subscribe((data) => {
                  this.alertas.showLoadingMessage(false, '')
                  this.alertas.showToast('success', 'Registro eliminado')
                  this.getDepartmentList()
                })
              }, 500)
            }
          });
    }

    saveItem() {
        this.departmentService.newDepartment(this.formNewItem.value)
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
            .subscribe(
                (data) => {
                    this.alertas.showToast('success', 'Registro correcto')
                    this.getDepartmentList()
                    this.formNewItem.reset()
                }
            )
    }

    filter(items: GenericItem[] | undefined, _formFilter: FormGroup): GenericItem[] {
        let name: string = _formFilter.get('name')?.value

        if ((name.length >= 3) && items) {
            return items.filter(
                (item) =>
                    item.nombre.toLowerCase().includes(name.toLowerCase())
            );
        } else if (items) {
            return items;
        }
        return [];
    }

    get nameControl(): FormControl {
        return this.formFilter.get('name') as FormControl;
    }

    get nameNewControl(): FormControl {
        return this.formNewItem.get('nombre') as FormControl;
    }
}