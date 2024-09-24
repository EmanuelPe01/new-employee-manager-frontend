import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericItem, url } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAuthPuestos(): Observable<GenericItem[]> {
    return this.http.get<GenericItem[]>(url + '/auth/puestos-list')
  }

  getPuestos(): Observable<GenericItem[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<GenericItem[]>(url + '/admin/puestos-list', {headers})
  }
}
