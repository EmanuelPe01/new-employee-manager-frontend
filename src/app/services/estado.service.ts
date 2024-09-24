import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericItem, url } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAuthEstados(): Observable<GenericItem[]> {
    return this.http.get<GenericItem[]>(url + '/auth/states-list')
  }

  getEstados(): Observable<GenericItem[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<GenericItem[]>(url + '/admin/states-list', {headers})
  }
}
