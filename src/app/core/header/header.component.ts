import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  authenticationService = inject(AuthenticationService);
  private router = inject(Router);

  logout(): void {
    console.log('logout');
    this.authenticationService.logout().subscribe(
      success => {
        this.authenticationService.isLogin.set(false);
        this.router.navigate(['login']);
      }
    );
  }

}
