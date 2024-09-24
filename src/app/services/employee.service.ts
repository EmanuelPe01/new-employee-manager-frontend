import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { EmployeeInfo, EmployeeInfoItem, url } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getEmployee(id: string | null): Observable<EmployeeInfoItem> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<EmployeeInfoItem>(url + '/admin/user/' + id, {headers})
  }

  getEmployess(): Observable<EmployeeInfoItem[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<EmployeeInfoItem[]>(url + '/admin/all-users', {headers})
  }

  deleteEmployee(id_employee: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete(url + '/admin/delete-user/' + id_employee, {headers, responseType: 'text'})
  }

  saveEmployee(employee: EmployeeInfo) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.put(url + '/admin/update-user', employee, {headers, responseType: 'text'})
  }
}
