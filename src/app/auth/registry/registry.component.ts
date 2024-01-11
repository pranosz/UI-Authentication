import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from '../services/user-management.service';
import { startWith } from 'rxjs';
import { AuthValidators } from 'src/app/common/validators/auth.validators';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistryComponent implements OnInit{
  private fb = inject(FormBuilder);
  private userManagementService = inject(UserManagementService);
  
  registryForm: FormGroup = this.fb.group({
      user: ['', 
      Validators.required,
      AuthValidators.isUserExistAsyncValidator(this.userManagementService)
    ],
      pwd: ['', [
        Validators.required, 
        AuthValidators.passwordStrengthValidator()
      ]],
      confirmPwd: ['', [AuthValidators.comfirmPasswordValidator()]]
  });

  ngOnInit(): void {
    this.registryForm.get('pwd')?.valueChanges.pipe(
      startWith('')
    ).subscribe(change => {
      console.log(change);
      if(change === '' || this.registryForm.get('pwd')?.invalid){
        this.registryForm.get('confirmPwd')?.disable();
      } else {
        this.registryForm.get('confirmPwd')?.enable();
      }
      /*
        console.log('pwd', change);
        console.log(this.registryForm.get('pwd2'));
        */
      });
  }

  getErrorMessage(controlName: string): string {

    if (this.registryForm?.get(controlName)?.hasError('required')) {
      return 'You must enter a value';
    } else if (this.registryForm?.get(controlName)?.hasError('passwordStrength')) {
      return 'Your password is not strong enough';
    } else if (this.registryForm?.get(controlName)?.hasError('passwordsDoesNotMatch')) {
      return 'Confirm password is different';
    } else if (this.registryForm?.get(controlName)?.hasError('userExists')) {
      return 'User already exists';
    }

    return '';
  }


  onSubmit(): void {
    console.log('registryForm ', this.registryForm.getRawValue());
    const userAuth = this.registryForm.getRawValue();
    /*
    this.userManagementService.userRegistry(userAuth).subscribe( response => {
      console.log('response ', response);
    });*/
   // this.loginForm.reset();
  }
}
