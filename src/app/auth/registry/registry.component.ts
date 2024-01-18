import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserManagementService } from '../services/user-management.service';
import { startWith } from 'rxjs';
import { AuthValidators } from 'src/app/common/validators/auth.validators';
import { ValidatorsMessagesService } from 'src/app/common/services/validators-messages';
import { Router } from '@angular/router';
/*
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && control.dirty);
  }
}
*/
@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  private fb = inject(FormBuilder);
  private userManagementService = inject(UserManagementService);
  private validatorsMessagesService = inject(ValidatorsMessagesService);
  private router = inject(Router);

  private disableSubmit = false;

  // matcher = new MyErrorStateMatcher();
  
  registryForm: FormGroup = this.fb.nonNullable.group({
      user: ['', 
      { 
        validators: [
          Validators.required, 
    //      RangeValidators.characterRangeValidator(8, 15)
        ],
        asyncValidators: [AuthValidators.isUserExistAsyncValidator(this.userManagementService)],
      //  updateOn: 'blur' 
      }
    ],
      pwd: ['', [
        Validators.required, 
    //    RangeValidators.characterRangeValidator(8, 15),
      //  AuthValidators.passwordStrengthValidator()
      ]],
      confirmPwd: ['', [Validators.required, AuthValidators.comfirmPasswordValidator()]]
  });

  get userControl(): AbstractControl {
    return this.registryForm.controls['user'];
  }

  get pwdControl(): AbstractControl {
    return this.registryForm.controls['pwd'];
  }

  get confirmPwdControl(): AbstractControl {
    return this.registryForm.controls['confirmPwd'];
  }


  get isSubmitDisable(): boolean {
    return !this.registryForm.valid || this.disableSubmit;
  }

  ngOnInit(): void {
    this.disableOrEnableComfirmField();
  }

  getErrorMessage(controlName: string): string {
    const control = this.registryForm.get(controlName);

    if(control?.errors) {
      return this.validatorsMessagesService.getSingleMessage(control.errors);
    }

    return '';
  }


  onSubmit(): void {
    this.disableSubmit = true;
    console.log('registryForm ', this.registryForm.getRawValue());
    const userAuth = this.registryForm.getRawValue();

    this.userManagementService.userRegistry(userAuth).subscribe( response => {
      
      this.disableSubmit = false;
      this.formDirective.resetForm();
      this.router.navigate(['login']);
    });
  }

  private disableOrEnableComfirmField(): void {
    this.pwdControl?.valueChanges.pipe(
      startWith('')
    ).subscribe(change => {
      if(change === '' || this.pwdControl?.invalid){
        this.confirmPwdControl?.disable();
      } else {
        this.confirmPwdControl?.enable();
      }
      });
  }
}
