// import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import {catchError, concatMap, Observable, Subject, throwError} from "rxjs";
// import { tap } from "rxjs/operators";
// import {ActivatedRoute, Router} from "@angular/router";
// import { Injectable } from "@angular/core";
// import { AccountsService } from "../accounts/accounts.service";
// import { ToastrService } from "ngx-toastr";
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private isRefreshing = false;
//   private refreshTokenSubject: Subject<any> = new Subject<any>();
//   private requestsInProgress = 0
//   constructor(
//     private router: Router,
//     private accountsService: AccountsService,
//     private toast: ToastrService,
//     private activatedRoute: ActivatedRoute
//   ) {}
//
//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     if (this.accountsService.loggedInUser) {
//       const token = this.accountsService.userTokens;
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token?.access_token}`,
//         },
//       });
//     }
//     return next.handle(request).pipe(
//       catchError((err) => {
//         if ([401].includes(err.status) && this.accountsService.loggedInUser) {
//           if(!this.isRefreshing) {
//             this.isRefreshing = true;
//             this.refreshTokenSubject.next(null);
//             return this.accountsService.refreshToken().pipe(
//               catchError((err) => {
//                 const url: string = this.router.url
//                 console.log('error refreshing token')
//                 this.accountsService.clearToken()
//                 localStorage.clear()
//                 this.accountsService.setRedirectUrl(url)
//                 this.toast.info('Your session expired, please login again')
//                 return this.router.navigateByUrl('/login').then()
//               }),
//               concatMap((response) => {
//                 this.isRefreshing = false;
//                 const userData = JSON.parse(
//                   localStorage.getItem("middlefund$user")!
//                 );
//                 userData.token = response.token;
//                 localStorage.setItem("middlefund$user", JSON.stringify(userData));
//                 this.accountsService.updateUser(userData);
//                 request = request.clone({
//                   setHeaders: {
//                     Authorization: `Bearer ${userData.token.access_token}`,
//                   },
//                 });
//                 return next.handle(request);
//               })
//             )
//           } else {
//             const url: string = this.router.url
//             this.toast.info('Your session expired, please login again')
//             this.accountsService.clearToken()
//             localStorage.clear()
//             this.accountsService.setRedirectUrl(url)
//             this.router.navigateByUrl('/login').then()
//           }
//         }
//         return throwError(err);
//       })
//     );
//   }
// }

import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {catchError, concatMap, NEVER, Observable, of, Subject, throwError} from "rxjs";
import { tap, finalize } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AccountsService } from "../accounts/accounts.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: Subject<any> = new Subject<any>();

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
        if (err.status === 401 && this.accountsService.loggedInUser) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null); // Signal to start token refresh

            return this.accountsService.refreshToken().pipe(
              tap((response) => {
                const userData = JSON.parse(localStorage.getItem("middlefund$user")!);
                userData.token = response.token;
                localStorage.setItem("middlefund$user", JSON.stringify(userData));
                this.accountsService.updateUser(userData);
                this.refreshTokenSubject.next(response.token.access_token); // Signal token refresh completed
              }),
              catchError((refreshTokenErr) => {
                console.log("Caught error: " + refreshTokenErr)
                if (refreshTokenErr.status === 401) {
                  console.log("401")
                  // Token refresh also resulted in 401, logout the user
                  return this.logoutUser();
                }
                return throwError(refreshTokenErr);
              }),
              finalize(() => {
                this.isRefreshing = false; // Reset the flag
                this.refreshTokenSubject.complete(); // Complete the subject
              }),
              concatMap((accessToken) => {
                if (accessToken) {
                  request = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  });
                }
                return next.handle(request);
              })
            );
          } else {
            // Token refresh is already in progress, queue the request
            return this.refreshTokenSubject.pipe(
              concatMap((accessToken) => {
                if (accessToken) {
                  request = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  });
                }
                return next.handle(request);
              })
            );
          }
        }
        return throwError(err);
      })
    );
  }

  private logoutUser(): Observable<never> {
    const url: string = this.router.url;
    this.toast.info('Your session expired, please login again');
    this.accountsService.clearToken();
    localStorage.clear();
    this.accountsService.setRedirectUrl(url);
    this.router.navigateByUrl('/login');
    return NEVER;
  }
}

