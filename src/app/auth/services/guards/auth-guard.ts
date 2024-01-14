import { Injectable, inject } from "@angular/core";
import { UrlTree } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard {

    private authenticationService = inject(AuthenticationService);

    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authenticationService.isLogin();
    }
}