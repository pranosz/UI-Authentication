import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, catchError, delay, map, of, switchMap } from "rxjs";
import { ValidationErrorsMessage } from "src/app/auth/models/validation-error-message.type";
import { UserManagementService } from "src/app/auth/services/user-management.service";

export class AuthValidators {

    static passwordStrengthValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.value;

            if(
                /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/.test(password) &&
                /[A-Z]+/.test(password) &&
                /[a-z]+/.test(password) &&
                /[0-9]+/.test(password)
            ) {
                return null;
            }
    
            return {[ValidationErrorsMessage.passwordStrength]: true};
        }
    }

    static comfirmPasswordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const pwd = control.parent?.get('pwd')?.value;
            const confirmPwd = control.parent?.get('confirmPwd')?.value;

            if(pwd && confirmPwd && pwd !== confirmPwd){
                return {[ValidationErrorsMessage.passwordsDoesNotMatch]: true}
            }
            return null;
        }
    }

    static isUserExistAsyncValidator(userService: UserManagementService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return of(control.value).pipe(
                delay(1000),
                switchMap(name => userService.checkIfUserExists(name)),
                map(result => result.exists ? {[ValidationErrorsMessage.userExists]: true} : null),
                catchError(() => of({[ValidationErrorsMessage.serverError]: true}))
            );
        }
    }
/*
    static isUserExistAsyncValidator2(userService: UserManagementService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return userService.getUsers().pipe(
                map(data => {
                    const result = data.some( username => username.toLocaleLowerCase() === control.value.toLocaleLowerCase());
                    return result ? {[ValidationErrorsMessage.userExists]: true} : null;
                }),
                catchError(() => of({[ValidationErrorsMessage.serverError]: true}))
            )
        }
    }
    */
}