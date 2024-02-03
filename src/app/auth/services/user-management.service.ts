import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserAuthResponse } from '../models/user-auth-response';

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
    return this.httpClient.post(`${this.url}/auth`, user, {withCredentials: true});
  }

  userLogout(): Observable<any> {
    return this.httpClient.get(`${this.url}/logout`,{withCredentials: true});
  }

  refreshToken(): Observable<Pick<UserAuthResponse, 'accessToken'>> {
    return this.httpClient.get<Pick<UserAuthResponse, 'accessToken'>>(`${this.url}/refresh`, {withCredentials: true});
  }

  checkIfUserExists(name: string): Observable<{'exists': boolean}> {
    return this.httpClient.post<{'exists': boolean}>(`${this.url}/users/exists`, {name});
  }

  getUsers(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.url}/users`);
  }
}
