import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { GenericItem, url } from '../models';

@Injectable({
  providedIn: 'root'
})

export class DepartamentoService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getDepartments(): Observable<GenericItem[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<GenericItem[]>(url + '/admin/department-list', {headers})
  }
}
