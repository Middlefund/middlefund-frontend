import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient,
    ) { }

    subscription(email: object){
      return this.http.post<any>(`${environment.BACKEND_URL}/api/newsletter-subscription`, email )
    }
}
