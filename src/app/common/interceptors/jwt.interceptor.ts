import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, switchMap, throwError } from "rxjs";
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
                const refToken = this.authenticationService.refreshToken();
                
                if (err instanceof HttpErrorResponse && refToken) {
                    if (err.status === 403) {
                        console.log('403');
                            return this.handleRefreshToken(newReq, next);
                    }else {
                        return throwError(() => err);;
                    }
                }

                return throwError(() => err);
            }))      
    }

    private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authenticationService.refreshToken().pipe(
            switchMap(newToken => {
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
            return request.clone(
                {headers: request.headers.set('Authorization', `Bearer ${authToken}`)}
            );
        }

        return request;
    }
}