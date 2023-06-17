import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AccountsService} from "../accounts/accounts.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private accountsService: AccountsService,
              private router: Router,
              private toast: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401].includes(err.status) ) {
        this.accountsService.refreshToken().subscribe({
          next: (response) => {
            const userData = JSON.parse(localStorage.getItem('middlefund$user')!);
            userData['token'] = response.token
            localStorage.setItem('middlefund$user', JSON.stringify(userData));
            this.accountsService.updateUser(userData)
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${userData.token.access_token}`
              }
            });
            return next.handle(request)
          },
          error: (err) => {
            localStorage.clear()
            this.accountsService.setRedirectUrl(this.router.url)
            this.router.navigateByUrl('/login').then(r => r)
            this.toast.info("Your session ended unexpectedly, login to continue")
          }
        })
      }
      return throwError(() => err);
    }))
  }
}
