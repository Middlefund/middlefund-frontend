import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmailSub, IContactUs } from '../utility/models';
import { messageData } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient,
    ) { }

    subscribeEmail(userMail : object){
      return this.http.post<messageData>(`${environment.BACKEND_URL}/api/newsletter-subscription`,userMail )
    }

  contactUs(contactUsInfo: IContactUs ){
    return this.http.post<messageData>(`${environment.BACKEND_URL}/api/contact-us`, contactUsInfo )
  }
}
