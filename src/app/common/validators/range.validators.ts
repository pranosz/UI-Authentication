import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class RangeValidators {

    static characterRangeValidator(min: number, max: number): ValidatorFn {

        return (control: AbstractControl): ValidationErrors | null => {
            const inputText = control?.value;
            if(inputText?.length < min || inputText?.length > max) {
                return {'characterRange': {min, max}}
            }

            return null;
        }
    } 
}