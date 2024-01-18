import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ValidationErrorsMessage } from "src/app/auth/models/validation-error-message.type";

export class RangeValidators {

    static characterRangeValidator(min: number, max: number): ValidatorFn {

        return (control: AbstractControl): ValidationErrors | null => {
            const inputText = control?.value;
            if(inputText?.length < min || inputText?.length > max) {
                return {[ValidationErrorsMessage.characterRange]: {min, max}}
            }

            return null;
        }
    } 
}