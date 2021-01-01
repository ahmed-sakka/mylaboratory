import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {from, Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /*TODO: check for gateway endpoints only*/
    // if (!request.url.startsWith(environment.gatewayEndpoint)) {
    //   return next.handle(request);
    // }

    // @ts-ignore
    return from(this.auth.getUserToken()).pipe(switchMap(token => {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
      return next.handle(request);
    }), catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const message = "Your token is expired!";
        this._snackBar.open(message, null, {
          duration: 10000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          panelClass: 'red-700',
        });
        this.auth.doLogout();
        this.router.navigate(['/login']);
      }
      return throwError(error);
    }));
  }
}
