import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  catchError,
  concatMap,
  NEVER,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AccountsService } from '../accounts/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private accountsService: AccountsService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    console.log(request.url, 'rud');
    if (this.accountsService.loggedInUser) {
      const token = this.accountsService.userTokens;
      if (request.url.startsWith(environment.HUBTEL_PAY)) {
        const base64Credentials = btoa(
          `${environment.HUBTEL_CLIENT_ID}:${environment.HUBTEL_CLIENT_SECRET}`,
        );
        request = request.clone({
          setHeaders: {
            Authorization: `Basic ${base64Credentials}`,
          },
        });
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token?.access_token}`,
          },
        });
      }
    }
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 && this.accountsService.loggedInUser) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null); // Signal to start token refresh

            return this.accountsService.refreshToken().pipe(
              tap(response => {
                const userData = JSON.parse(
                  localStorage.getItem('middlefund$user')!,
                );
                userData.token = response.token;
                localStorage.setItem(
                  'middlefund$user',
                  JSON.stringify(userData),
                );
                this.accountsService.updateUser(userData);
                this.refreshTokenSubject.next(response.token.access_token); // Signal token refresh completed
              }),
              catchError(refreshTokenErr => {
                if (refreshTokenErr.status === 401) {
                  // Token refresh also resulted in 401, logout the user
                  return this.logoutUser();
                }
                return throwError(refreshTokenErr);
              }),
              finalize(() => {
                this.isRefreshing = false; // Reset the flag
                this.refreshTokenSubject.complete(); // Complete the subject
              }),
              concatMap(tokens => {
                console.log(tokens.token.access_token, 'access token');
                console.log(tokens, 'tokkeeenn after refresh');
                if (tokens) {
                  request = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${tokens.token.access_token}`,
                    },
                  });
                }
                return next.handle(request);
              }),
            );
          } else {
            // Token refresh is already in progress, queue the request
            return this.refreshTokenSubject.pipe(
              concatMap(accessToken => {
                if (accessToken) {
                  request = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  });
                }
                return next.handle(request);
              }),
            );
          }
        }
        return throwError(err);
      }),
    );
  }

  private logoutUser(): Observable<never> {
    const url: string = this.router.url;
    this.toast.info('Your session expired, please login again');
    this.accountsService.clearToken();
    localStorage.clear();
    this.accountsService.setRedirectUrl(url);
    localStorage.setItem('redirectUrl', url);
    this.router.navigateByUrl('/login').then(r => r);
    return NEVER;
  }
}
