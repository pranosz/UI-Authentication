import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthenticationService } from "../authentication.service";

@Injectable({
    providedIn: 'root'
  })

export class JwtInterceptor implements HttpInterceptor {

    private authenticationService = inject(AuthenticationService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authToken = this.authenticationService.getJWToken();
        let newReq = req;
        
        if (authToken) {
            console.log('HttpInterceptor :) ');
            newReq = req.clone(
                {headers: req.headers.set('Authorization', `Bearer ${authToken}`)}
            );
        }

        return next.handle(newReq)
            .pipe(catchError(err => {
                console.log('HttpInterceptor ', err);

                return throwError(() => err);
            }))

            
    }
}