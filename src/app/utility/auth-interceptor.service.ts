import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AccountsService} from "../accounts/accounts.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private accountsService: AccountsService,) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.accountsService.loggedInUser) {
      const token= this.accountsService.userTokens
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token?.access_token}`
        }
      });
    }
    return next.handle(req)
  }


}
