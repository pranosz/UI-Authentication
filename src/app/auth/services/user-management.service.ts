import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private url = 'http://localhost:3500';
  private httpClient = inject(HttpClient);

  userRegistry(user: User): Observable<any> {
    return this.httpClient.post(`${this.url}/register`, user);
  }

  userAuthentication(user: User): Observable<any> {
    return this.httpClient.post(`${this.url}/auth`, user);
  }

  userLogout(user: User): Observable<any> {
    return this.httpClient.get(`${this.url}/logout`);
  }
}
