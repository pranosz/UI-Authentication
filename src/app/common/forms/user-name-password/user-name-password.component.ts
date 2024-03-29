import { Component, Input, OnInit, inject } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsMessagesService } from 'src/app/common/services/validators-messages';

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
  private validatorsMessagesService = inject(ValidatorsMessagesService);

  get parentFormGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(this.controlName, this.fb.group({
      user: ['', Validators.required],
      pwd: ['', Validators.required]
    }))
  }

  

  getErrorMessage(name: string): string {
    const control = this.parentFormGroup.controls[this.controlName]?.get(name);

    if(control?.errors) {
      return this.validatorsMessagesService.getSingleMessage(control.errors);
    }

    return '';
  }

  mgOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlName);
  }
}
