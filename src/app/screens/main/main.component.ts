import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  template: `
    <div class="row">
      <div class="col col-2"
        style="
            height: 100vh;
            border: solid 1px rgba(0,0,0,0.1);
            background: linear-gradient(210deg, rgba(255,255,255,1) 0%, rgba(244,244,244,1) 50%, rgba(255,255,255,1) 100%);
        ">
      <ul class="nav flex-column mt-3" >
        <li class="nav-item m-3">
          <h3>Hola {{nombre}}</h3>
        </li>
        <li class="nav-item m-3">
         <a class="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" routerLink="/">Empleados</a>
        </li>
        <li class="nav-item m-3">
         <a class="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" routerLink="departments">Departamentos</a>
        </li>
        <li class="nav-item mt-3 mb-3">
          <div class="d-grid gap-2">
            <button class="btn btn-dark" type="button" (click)="logout()">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>  
              Cerrar sesión
            </button>
          </div>
        </li>
      </ul>
      </div>
      <div class="col col-10">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class MainComponent implements OnInit{
  nombre: string = ''
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if(this.authService.getToken() == ""){
      this.router.navigate(["/auth"]);
    } else {
      this.nombre = this.authService.getName();
    }
  }

  logout() {
    this.authService.deteleAllCookies()
    this.router.navigate(["/auth"]);
  }
}
