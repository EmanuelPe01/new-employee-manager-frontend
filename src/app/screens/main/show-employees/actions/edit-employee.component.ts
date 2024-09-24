import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { Alerts } from "src/app/items/alerts";
import { GenericItem, EmployeeInfoItem } from "src/app/models";
import { EmployeeService } from "src/app/services/employee.service";
import { EstadoService } from "src/app/services/estado.service";
import { PuestoService } from "src/app/services/puesto.service";

@Component({
    template: `
        <div style="text-align: center; margin: 50px 0 0 0;">
            <h1>
                Editar un recurso humano
            </h1>
        </div>
        <form>
            <div class="card">
                <div class="card-header">
                    Información del recurso humano
                </div>
                <div class="card-body">
                    <form (ngSubmit)="saveEmployee()" [formGroup]="formEmployeeInfo">
                        <div class="row">
                            <div class="col">
                                <custom-input placeHolder="Nombre(s)" type="text" [control]="nameControl"></custom-input>
                            </div>
                            <div class="col">
                                <custom-input [placeHolder]="'Primer apellido'" [type]="'text'" [control]="firstSurnameControl">
                                </custom-input>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col">
                                <custom-input [placeHolder]="'Segundo apellido'" [type]="'text'"
                                    [control]="secondSurnameControl">
                                </custom-input>
                            </div>
                            <div class="col">
                                <custom-input [placeHolder]="'CURP'" [type]="'text'" [control]="curpControl">
                                </custom-input>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col">
                                <custom-input [placeHolder]="'Correo electrónico'" [type]="'text'"
                                    [control]="emailControl">
                                </custom-input>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col">
                                <custom-selector placeHolder="Puesto" [options]="puestos"
                                    [control]="puestoControl"></custom-selector>
                            </div>
                            <div class="col">
                                <custom-selector placeHolder="Estado" [options]="estados"
                                    [control]="estadoControl"></custom-selector>
                            </div>
                        </div>
                        <br>
                        <div class="row text-center">
                            <div class="col-6">
                                <button class="btn-primary" type="submit">Aceptar</button>
                            </div>
                            <div class="col-6">
                                <button class="btn-secondary" type="button" routerLink="../..">Cancelar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </form>
    `
})

export class EditEmployeeComponent {
    formEmployeeInfo!: FormGroup;
    puestos: GenericItem[] = []
    departamentos: GenericItem[] = []
    empleados: EmployeeInfoItem[] = []
    estados: GenericItem[] = []
    id_employee: string | null = ''

    constructor(
        private puestoService: PuestoService,
        private estadoService: EstadoService,
        private employeeService: EmployeeService,
        private alertas: Alerts,
        private router: Router,
        private activatedRute: ActivatedRoute,
    ) {
        this.id_employee = this.activatedRute.snapshot.paramMap.get('id-employee')
    }

    ngOnInit() {
        this.getPuestosList()
        this.formEmployeeInfo = new FormGroup({
            id: new FormControl(this.id_employee),
            name: new FormControl('', Validators.required),
            firstSurname: new FormControl('', Validators.required),
            secondSurname: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            curp: new FormControl('', Validators.required),
            puesto_id: new FormControl('', Validators.required),
            estado_id: new FormControl('', Validators.required),
            password: new FormControl(''),
            rol: new FormControl('ADMIN', Validators.required)
        });
    }

    saveEmployee() {
        this.alertas.showLoadingMessage(true, 'Guardando')
        setTimeout(() => {
            this.employeeService.saveEmployee(this.formEmployeeInfo.value)
            .pipe(
                catchError((error) => {
                    if (error instanceof HttpErrorResponse) {
                        console.log(error.message)
                        if (error.status)
                            this.alertas.showErrorMessage(`Error con código ${error.status}`)
                    }
                    return throwError(() => new Error("Save Failed"));
                })
            )
            .subscribe((data) => {
                this.alertas.showLoadingMessage(false, '')
                this.alertas.showToast("success", 'Datos almacenados correctamente')
                this.router.navigate(["/"]);
            })
        }, 500)
    }

    getEmployeeInfo() {
        this.employeeService.getEmployee(this.id_employee)
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
            .subscribe((data: EmployeeInfoItem) => {
                let departamento = this.departamentos.find(departamento => data.departamento == departamento.nombre)
                let puesto = this.puestos.find(puesto => data.puesto == puesto.nombre)
                let estado = this.estados.find(estado => data.estado == estado.nombre)
                let fullName = this.separarNombreCompleto(data.fullName)

                this.formEmployeeInfo.patchValue({
                    name: fullName.nombre,
                    firstSurname: fullName.apellidoPaterno,
                    secondSurname: fullName.apellidoMaterno,
                    curp: data.curp,
                    email: data.email,
                    departamento_id: departamento?.id,
                    puesto_id: puesto?.id,
                    estado_id: estado?.id
                })
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
                this.getEstadosList()
            })
    }

    getEstadosList() {
        this.estadoService.getEstados()
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
                this.getEmployeeInfo()
            })
    }

    separarNombreCompleto(nombreCompleto: string) {
        let partes = nombreCompleto.trim().split(" ");
        let preposiciones = ["de", "del", "la", "los", "las"]; // Lista de preposiciones comunes

        let nombre: string | undefined = "";
        let apellidoPaterno: string | undefined = "";
        let apellidoMaterno: string | undefined = "";

        if (partes.length >= 2) {
            // Empezamos desde el último elemento hacia atrás
            apellidoMaterno = partes.pop(); // Último elemento es el apellido materno

            // Revisar si el apellido paterno es compuesto (si contiene una preposición)
            while (preposiciones.includes(partes[partes.length - 1])) {
                apellidoMaterno = partes.pop() + " " + apellidoMaterno; // Unimos las preposiciones al apellido materno
            }

            apellidoPaterno = partes.pop(); // Penúltimo elemento es el apellido paterno

            // Revisar si el apellido paterno es compuesto (si contiene una preposición)
            while (preposiciones.includes(partes[partes.length - 1])) {
                apellidoPaterno = partes.pop() + " " + apellidoPaterno; // Unimos las preposiciones al apellido paterno
            }

            // Todo lo que queda es el nombre
            nombre = partes.join(" ");
        }

        return {
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno
        };
    }

    get nameControl(): FormControl {
        return this.formEmployeeInfo.get('name') as FormControl;
    }

    get firstSurnameControl(): FormControl {
        return this.formEmployeeInfo.get('firstSurname') as FormControl;
    }

    get secondSurnameControl(): FormControl {
        return this.formEmployeeInfo.get('secondSurname') as FormControl;
    }

    get curpControl(): FormControl {
        return this.formEmployeeInfo.get('curp') as FormControl;
    }

    get emailControl(): FormControl {
        return this.formEmployeeInfo.get('email') as FormControl;
    }

    get departamentoControl(): FormControl {
        return this.formEmployeeInfo.get('departamento_id') as FormControl;
    }

    get puestoControl(): FormControl {
        return this.formEmployeeInfo.get('puesto_id') as FormControl;
    }

    get estadoControl(): FormControl {
        return this.formEmployeeInfo.get('estado_id') as FormControl;
    }
}