import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, catchError, delay, map, of, switchMap } from "rxjs";
import { UserManagementService } from "src/app/auth/services/user-management.service";

export class AuthValidators {

    static passwordStrengthValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.value;

            if(
                password.length >= 8 &&
                /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/.test(password) &&
                /[A-Z]+/.test(password) &&
                /[a-z]+/.test(password) &&
                /[0-9]+/.test(password)
            ) {
                return null;
            }
    
            return {passwordStrength: true};
        }
    }

    static comfirmPasswordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const pwd = control.parent?.get('pwd')?.value;
            const confirmPwd = control.parent?.get('confirmPwd')?.value;

            if(pwd && confirmPwd && pwd !== confirmPwd){
                return {passwordsDoesNotMatch: true}
            }
            return null;
        }
    }

    static isUserExistAsyncValidator(userService: UserManagementService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return of(control.value).pipe(
                delay(1000),
                switchMap(name => userService.checkIfUserExists(name)),
                map(result => result.exists ? {'userExists': true} : null),
                catchError(() => of({'serverError': true}))
            );
        }
    }
}