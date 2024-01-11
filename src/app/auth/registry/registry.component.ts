import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from '../services/user-management.service';
import { startWith } from 'rxjs';

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
      user: ['', Validators.required],
      pwd: ['', Validators.required],
      pwd2: ['', Validators.required]
  });

  ngOnInit(): void {
    this.registryForm.get('pwd')?.valueChanges.pipe(
      startWith('')
    ).subscribe(change => {
      if(change === ''){
        this.registryForm.get('pwd2')?.disable();
      } else {
        this.registryForm.get('pwd2')?.enable();
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
