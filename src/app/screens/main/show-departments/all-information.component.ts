import { Component } from "@angular/core";

@Component({
    template: `
    <div class="container">
        <div class="row mt-3 mb-3">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" routerLink="/departments">Departamentos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" routerLink="puestos">Puestos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" routerLink="estados">Estados</a>
                </li>
            </ul>
        </div>
        <div class="row">
            <router-outlet></router-outlet>
        </div>
    </div>
    `
})

export class AllDepartmentsInformation {

}