import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {loginData} from "../utility/models";
import {AlertService} from "../alert";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient,
              private alert: AlertService) { }

  login(credentials: object): Observable<any> {
    return this.http.post<loginData>(`${environment.BACKEND_URL}/api/auth/login`, credentials).pipe(
      tap( response => {
      localStorage.setItem("token", JSON.stringify(response.token))
      localStorage.setItem("user", JSON.stringify(response.user))
    }),
      catchError(error => {
        this.alert.error(error.error.message || "Oops! Server error")
        return throwError(error)
      }))
  }

  register(userData: object) {
    return this.http.post(`${environment.BACKEND_URL}/api/auth/register`, userData)
  }
}
