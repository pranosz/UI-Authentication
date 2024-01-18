import { Injectable, inject, signal } from '@angular/core';
import { UserManagementService } from './user-management.service';
import { User } from '../models/user';
import { UserAuthResponse } from '../models/user-auth-response';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userManagementService = inject(UserManagementService);
  private userAuth: UserAuthResponse | null = null;

  isLogin = signal<boolean>(false);

  login(userCredentials: User): Observable<boolean> {

    return this.userManagementService.userAuthentication(userCredentials).pipe(
      tap(response => console.log('response ', response)),
      map((response: UserAuthResponse) => {
        this.userAuth = response;
        this.isLogin.set(true);

        return true;
    })
    );
  }

  refreshToken(): Observable<string> {
    console.log("refreshToken ");
    return this.userManagementService.refreshToken().pipe(
      tap(a => console.log('refreshToken tap ', a)),
      map(newToken => {
        if(this.userAuth?.accessToken) {
          console.log("refreshToken > newToken ", newToken.accessToken);
          this.userAuth.accessToken = newToken.accessToken;
        } 
        return newToken.accessToken;
      }),
      catchError((err) => {
        console.log('refreshToken error ', err);
        return of(err)
      })
    );
  }

  logout(): Observable<boolean>  {
    console.log('userLogout');
    return this.userManagementService.userLogout();
  }

  getJWToken(): string | null{
    return this.userAuth?.accessToken ?? null;
  }
}
