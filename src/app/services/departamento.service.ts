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

  newDepartment(body: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(url + "/admin/new-department", body, {headers})
  }

  deleteDepartment(id: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete(url + '/admin/delete-department/' + id, {headers, responseType: 'text'})
  }
}
