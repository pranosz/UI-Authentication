import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  loginForm: FormGroup = this.fb.group({});

  onSubmit(): void {
    console.log('loginForm ', this.loginForm.getRawValue()['user-credentials']);
    const userAuth = this.loginForm.getRawValue()['user-credentials'];

    this.authenticationService.login(userAuth).subscribe( response => {
      this.router.navigate(['dashboard']);
    });
    
  }

}
