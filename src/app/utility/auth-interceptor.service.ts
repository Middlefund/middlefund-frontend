import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, concatMap, Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AccountsService } from "../accounts/accounts.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private accountsService: AccountsService,
    private toast: ToastrService
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
        if ([401].includes(err.status)) {
          return this.accountsService.refreshToken().pipe(
            concatMap((response) => {
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
          );
        }
        return throwError(() => err);
      })
    );
  }
}
