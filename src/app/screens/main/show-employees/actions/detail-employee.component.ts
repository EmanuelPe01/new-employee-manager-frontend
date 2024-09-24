import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
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
                Detalle del recurso humano
            </h1>
        </div>
        <form>
            <div class="card">
                <div class="card-header">
                    Información del recurso humano
                </div>
                <div class="card-body">
                    <form [formGroup]="formEmployeeInfo">
                        <div class="row">
                            <div class="col">
                                <custom-input placeHolder="Nombre(s)" type="text" [control]="nameControl" [desactivado]="true"></custom-input>
                            </div>
                            <div class="col">
                                <custom-input [placeHolder]="'Primer apellido'" [type]="'text'" [control]="firstSurnameControl" [desactivado]="true">
                                </custom-input>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col">
                                <custom-input [placeHolder]="'Segundo apellido'" [type]="'text'"
                                    [control]="secondSurnameControl" [desactivado]="true">
                                </custom-input>
                            </div>
                            <div class="col">
                                <custom-input [placeHolder]="'CURP'" [type]="'text'" [control]="curpControl" [desactivado]="true">
                                </custom-input>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col">
                                <custom-input [placeHolder]="'Correo electrónico'" [type]="'text'"
                                    [control]="emailControl" [desactivado]="true">
                                </custom-input>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col">
                                <custom-input [placeHolder]="'Departamento'" [type]="'text'"
                                    [control]="departamentoControl" [desactivado]="true">
                                </custom-input>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col">
                                <custom-input placeHolder="Puesto" [type]="'text'"
                                    [control]="puestoControl" [desactivado]="true"></custom-input>
                            </div>
                            <div class="col">
                                <custom-input placeHolder="Estado" [type]="'text'"
                                    [control]="estadoControl" [desactivado]="true"></custom-input>
                            </div>
                        </div>
                        <br>
                        <div class="row text-center">
                            <div class="col-6">
                                <button class="btn-primary" type="button" routerLink="../..">Aceptar</button>
                            </div>
                            <div class="col-6">
                                <button class="btn-secondary" type="button" routerLink="../../edit-employee/{{id_employee}}">Editar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </form>
    `
})

export class DetailEmployeeComponent {
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
        this.getEmployeeInfo()
        this.formEmployeeInfo = new FormGroup({
            id: new FormControl(this.id_employee),
            name: new FormControl('', Validators.required),
            firstSurname: new FormControl('', Validators.required),
            secondSurname: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            curp: new FormControl('', Validators.required),
            puesto_id: new FormControl('', Validators.required),
            departamento_id: new FormControl('', Validators.required),
            estado_id: new FormControl('', Validators.required),
            password: new FormControl(''),
            rol: new FormControl('ADMIN', Validators.required)
        });
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
                let fullName = this.separarNombreCompleto(data.fullName)

                this.formEmployeeInfo.patchValue({
                    name: fullName.nombre,
                    firstSurname: fullName.apellidoPaterno,
                    secondSurname: fullName.apellidoMaterno,
                    curp: data.curp,
                    email: data.email,
                    departamento_id: data.departamento,
                    puesto_id: data.puesto,
                    estado_id: data.estado
                })
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