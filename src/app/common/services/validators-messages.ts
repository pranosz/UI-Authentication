import { Injectable } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { ValidationErrorsMessage } from "src/app/auth/models/validation-error-message.type";

@Injectable({
    providedIn: 'root'
  })
  export class ValidatorsMessagesService {

    private readonly messages = new Map<ValidationErrorsMessage, any>(
        [
        [ValidationErrorsMessage.required, 'You must enter a value'],
        [ValidationErrorsMessage.characterRange, (min: number, max: number) => `Input field must contain ${min} to ${max} characters`],
        [ValidationErrorsMessage.passwordsDoesNotMatch, 'Confirm password is different'],
        [ValidationErrorsMessage.userExists, 'User already exists'],
        [ValidationErrorsMessage.serverError, 'Server error'],
        [ValidationErrorsMessage.passwordStrength, 'Your password is not strong enough']
    ]
    );

    getSingleMessage(errors: ValidationErrors): string {
        const key = Object.keys(errors)[0] as ValidationErrorsMessage;       
        
        if(key === ValidationErrorsMessage.characterRange){
            const msgFunc = this.messages.get(ValidationErrorsMessage.characterRange);
            const msg = msgFunc(errors[key].min, errors[key].max);
            return msg;
        }
       
        return this.messages.get(key);
    }

  }