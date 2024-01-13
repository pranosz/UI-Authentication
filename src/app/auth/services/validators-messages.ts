import { Injectable, signal } from "@angular/core";
import { ValidationErrorsEnum } from "src/app/auth/models/validtion-errors.enum";

@Injectable({
    providedIn: 'root'
  })
  export class ValidatorsMessagesService {

    private readonly messages = new Map<ValidationErrorsEnum, any>(
        [
        [ValidationErrorsEnum.required, 'You must enter a value'],
        [ValidationErrorsEnum.characterRange, (min: number, max: number) => `Input field must contain ${min} to ${max} characters`],
        [ValidationErrorsEnum.passwordsDoesNotMatch, 'Confirm password is different'],
        [ValidationErrorsEnum.userExists, 'User already exists'],
        [ValidationErrorsEnum.serverError, 'Server error'],
        [ValidationErrorsEnum.passwordStrength, 'Your password is not strong enough']
    ]
    );

    getSingleMessage(errors: any): string {
        const key = Object.keys(errors)[0] as ValidationErrorsEnum;       
        
        if(key === ValidationErrorsEnum.characterRange){
            const msgFunc = this.messages.get(ValidationErrorsEnum.characterRange);
            const msg = msgFunc(errors[key].min, errors[key].max);
            return msg;
        }
       
        return this.messages.get(key);
    }

  }