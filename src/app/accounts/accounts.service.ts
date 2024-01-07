import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  NEVER,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { loginData, registerMessage } from '../utility/models';
import { AlertService } from '../alert';
import { environment } from '../../environments/environment';
import { IRequestCountry, messageData } from '../models/interfaces';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private userSubject!: BehaviorSubject<any>;
  public user!: Observable<any>;
  public redirectUrl: string = '';
  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private router: Router,
    private toast: ToastrService,
  ) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('middlefund$user')!),
    );
    this.user = this.userSubject.asObservable();
  }

  public get loggedInUser() {
    return this.userSubject.value || false;
  }

  public updateUser(user: any) {
    this.userSubject.next(user);
  }

  public get userData() {
    return this.userSubject.value.user;
  }

  public get userTokens() {
    return this.userSubject.value?.token;
  }

  login(credentials: object) {
    return this.http
      .post<loginData>(`${environment.BACKEND_URL}/api/login`, credentials, {
        headers: {
          'Access-Control-Allow-Origin': 'https://middlefund.onrender.com',
          'Access-Control-Allow-Credentials': 'true',
        },
      })
      .pipe(
        tap(response => {
          console.log(response);
          localStorage.setItem('middlefund$user', JSON.stringify(response));
          this.userSubject.next(response);
        }),
        catchError(error => {
          this.alert.error(error.error.message || 'Oops! Server error');
          return throwError(error);
        }),
      );
  }

  register(userData: object) {
    return this.http.post<registerMessage>(
      `${environment.BACKEND_URL}/api/register`,
      userData,
    );
  }

  forgotPassword(email: object) {
    return this.http.post<any>(
      `${environment.BACKEND_URL}/api/forgot-password`,
      email,
    );
  }

  resetPassword(details: object) {
    return this.http.post<any>(
      `${environment.BACKEND_URL}/api/reset-password`,
      details,
    );
  }

  socialLogin(socialCredentials: any) {
    return this.http.post<any>(
      `${environment.BACKEND_URL}/api/social-login`,
      socialCredentials,
    );
  }

  logout() {
    return this.http.post<any>(`${environment.BACKEND_URL}/api/logout`, {});
  }

  clearToken() {
    this.userSubject = new BehaviorSubject<any>(null);
  }

  refreshToken(
    refreshToken: string = this.userTokens.refresh_token,
    user_type: string = this.userData.user_type,
  ) {
    return this.http
      .post<any>(`${environment.BACKEND_URL}/api/refresh`, {
        refreshToken,
        user_type,
      })
      .pipe(
        catchError(refreshTokenErr => {
          this.logoutUser();
          return throwError(refreshTokenErr);
        }),
      );
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  notifications() {
    return this.http.get<messageData>(
      `${environment.BACKEND_URL}/api/user-notification`,
    );
  }

  private logoutUser(): Observable<never> {
    const url: string = this.router.url;
    this.toast.info('Your session expired, please login again');
    this.clearToken();
    localStorage.clear();
    this.setRedirectUrl(url);
    localStorage.setItem('redirectUrl', JSON.stringify(url));
    this.router.navigateByUrl('/login');
    return NEVER;
  }

  requestCountry(requestInfo: IRequestCountry) {
    return this.http.post<messageData>(
      `${environment.BACKEND_URL}/api/request-country`,
      requestInfo,
    );
  }
}
