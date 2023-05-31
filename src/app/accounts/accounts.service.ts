import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  login(credentials: object) {
    this.http.post('/login', credentials).pipe(tap( response => {
    }),
      catchError(error => {
        return throwError(error)
      }))
  }
}
