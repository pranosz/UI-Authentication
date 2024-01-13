import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from '../services/user-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private userManagementService = inject(UserManagementService);
  private router = inject(Router);
  loginForm: FormGroup = this.fb.group({});

  onSubmit(): void {
    console.log('loginForm ', this.loginForm.getRawValue()['user-credentials']);
    const userAuth = this.loginForm.getRawValue()['user-credentials']
    this.userManagementService.userAuthentication(userAuth).subscribe( response => {
      console.log('response ', response);
      this.router.navigate(['dashboard']);
    });
  }

}
