import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeInfo, LoginInfo, SessionInfo, url } from '../models';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  date = new Date();

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) {
    this.date.setDate(this.date.getDate() + 30);  // Expira en 30 días
  }

  registerEmployee(employee: EmployeeInfo) {
    return this.http.post(url + '/auth/register', employee, {responseType: 'text'})
  }

  authenticate(data: LoginInfo): Observable<SessionInfo> {
    return this.http.post<SessionInfo>(url + '/auth/authenticate', data)
  }

  setToken(token: string) {
    this.cookie.set('token', token, { expires: this.date, path: '/' }); //token accesible desde todas las rutas
  }

  getToken() {
    return this.cookie.get('token');
  }

  deleteToken() {
    this.cookie.delete('token');
  }

  setRole(role: string) {
    this.cookie.set('role', role, { expires: this.date, path: '/' });
  }

  getRole() {
    return this.cookie.get('role');
  }

  deleteRole() {
    this.cookie.delete('name');
  }

  setName(name: string) {
    this.cookie.set('name', name, { expires: this.date, path: '/' });
  }

  getName() {
    return this.cookie.get('name');
  }

  deleteName() {
    this.cookie.delete('role');
  }

  setEmail(email: string) {
    this.cookie.set('email', email, { expires: this.date, path: '/' });
  }

  getEmail() {
    return this.cookie.get('email');
  }

  deleteEmail() {
    this.cookie.delete('email');
  }

  deteleAllCookies() {
    this.cookie.deleteAll();
  }
}
