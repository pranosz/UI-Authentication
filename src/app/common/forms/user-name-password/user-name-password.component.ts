import { Component, Input, OnInit, inject } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-group-user-name-password',
  templateUrl: './user-name-password.component.html',
  styleUrls: ['./user-name-password.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer, 
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ]
})
export class UserNamePasswordComponent implements OnInit {
  @Input({required: true}) controlName!: string;

  controlContainer = inject(ControlContainer);
  private fb = inject(FormBuilder);

  get parentFormGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(this.controlName, this.fb.group({
      user: ['', Validators.required],
      pwd: ['', Validators.required]
    }))
  }

  getErrorMessage(controlName: string): string {
    if (this.parentFormGroup?.controls[this.controlName]?.get(controlName)?.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  mgOnDestroy(): void {
    this,this.parentFormGroup.removeControl(this.controlName);
  }
}
