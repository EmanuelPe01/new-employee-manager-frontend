import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { EmployeeInfoItem, url } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getEmployess(): Observable<EmployeeInfoItem[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<EmployeeInfoItem[]>(url + '/admin/all-users', {headers})
  }
}
