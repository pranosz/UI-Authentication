import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, switchMap, tap, throwError } from "rxjs";
import { AuthenticationService } from "../../auth/services/authentication.service";

@Injectable({
    providedIn: 'root'
  })

export class JwtInterceptor implements HttpInterceptor {

    private authenticationService = inject(AuthenticationService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authToken = this.authenticationService.getJWToken();
        let newReq = req;
        
        newReq = this.addJWTokenToRequest(newReq, authToken);

        return next.handle(newReq)
            .pipe(catchError(err => {
                console.log('JwtInterceptor ', err);
                const refToken = this.authenticationService.refreshToken();
                
                if (err instanceof HttpErrorResponse && refToken) {
                    console.log("err.status ", typeof err.status);
                    if (err.status === 403) {
                        console.log('403');
                        if (refToken) {
                            return this.handleRefreshToken(newReq, next);
                        } else {
                            return throwError(() => err);;
                        }  
                    }
                }

                return throwError(() => err);
            }))      
    }

    private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authenticationService.refreshToken().pipe(
            switchMap(newToken => {
                console.log("from refreshToken newToken ", newToken);
                const req = this.addJWTokenToRequest(request, newToken);
                return next.handle(req);
            }),
            catchError((error) => {
                this.authenticationService.logout().subscribe();
                return throwError(() => error);;
            })
        )
    }

    private addJWTokenToRequest(request: HttpRequest<any>, authToken: string | null): HttpRequest<any>  {
        if (authToken) {
            console.log('JwtInterceptor :) ');
            return request = request.clone(
                {headers: request.headers.set('Authorization', `Bearer ${authToken}`)}
            );
        }

        return request;
    }
}