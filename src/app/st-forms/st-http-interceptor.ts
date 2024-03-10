import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StMessageService } from './st-message.service';
import { StRemoteDataService } from './st-remote-data.service';

const AUTH_PREFIX = 'jwt';
const TOKEN_NAME = 'jwtToken';

@Injectable()
export class StHttpInterceptor implements HttpInterceptor {

  constructor(
    private msg: StMessageService,
    private router: Router,
    private remoteService: StRemoteDataService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(TOKEN_NAME);

    // ADD authentication token in header
    request = request.clone({
      setHeaders: {
        Authorization: `${AUTH_PREFIX} ${token}`
      }
    });

    // Error handling
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // if (event.body.code === '503') {
        //   this._interceptorEmitter.onNotify503(true);
        // }
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        // console.log('error in StHttpInterceptor', err);
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.error('An error occurred:', err.error.message);
          this.msg.sendMessage('feedback', 'danger', `Backend Error with status ${err.status} : ${err.error}`);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(err.error.code);

          if (err.error.code === 'user_not_confirmed') {
            this.msg.sendFlash('danger', 'USER.complete_profile');
            this.router.navigate([environment.afterFbSignup]);
          } else if (err.status === 401) {
            this.remoteService.logout();
          }

          if (err.status && err.error && err.error.code) {
            this.msg.sendMessage('feedback', 'danger', `BACKEND.${err.error.code}`);
          } else {
            this.msg.sendMessage('feedback', 'danger', `BACKEND.${err.error}`);
          }

        }
        /*
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
        }
        */
      }
    });
  }
}