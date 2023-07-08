import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {loginData} from "../utility/models";
import {messageData} from "../models/interfaces";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  constructor(private http: HttpClient) {
  }

  changePersonalSettings(personalSettings: any) {
    return this.http.post<messageData>(`${environment.BACKEND_URL}/api/change-personal-information`, personalSettings)
  }
}
