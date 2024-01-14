import { Injectable, inject, signal } from '@angular/core';
import { UserManagementService } from './user-management.service';
import { User } from '../models/user';
import { UserAuthResponse } from '../models/user-auth-response';
import { Observable, map, tap } from 'rxjs';

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

  getJWToken(): string | null{
    return this.userAuth?.accessToken ?? null;
  }
}
