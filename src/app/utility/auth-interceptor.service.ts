import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, concatMap, Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import { Injectable } from "@angular/core";
import { AccountsService } from "../accounts/accounts.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  constructor(
    private router: Router,
    private accountsService: AccountsService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.accountsService.loggedInUser) {
      const token = this.accountsService.userTokens;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401].includes(err.status) && this.accountsService.loggedInUser) {
          if(!this.isRefreshing) {
            this.isRefreshing = true;
            return this.accountsService.refreshToken().pipe(
              catchError((err): any => {
                const url: string = this.router.url
                console.log('error refreshing token')
                this.accountsService.clearToken()
                localStorage.clear()
                this.accountsService.setRedirectUrl(url)
                this.toast.info('Your session expired, please login again')
                return this.router.navigateByUrl('/login').then()
              }),
              concatMap((response) => {
                this.isRefreshing = false;
                const userData = JSON.parse(
                  localStorage.getItem("middlefund$user")!
                );
                userData.token = response.token;
                localStorage.setItem("middlefund$user", JSON.stringify(userData));
                this.accountsService.updateUser(userData);
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${userData.token.access_token}`,
                  },
                });
                return next.handle(request);
              })
            )
          } else {
            const url: string = this.router.url
            this.toast.info('Your session expired, please login again')
            this.accountsService.clearToken()
            localStorage.clear()
            this.accountsService.setRedirectUrl(url)
            this.router.navigateByUrl('/login').then()
          }
        }
        return throwError(err);
      })
    );
  }
}
