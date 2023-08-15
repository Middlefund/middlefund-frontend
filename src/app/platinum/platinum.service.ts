import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {messageData} from "../models/interfaces";

@Injectable({
  providedIn: "root"
})
export class PlatinumService {

  constructor(private http: HttpClient) {
  }

  getUserWorkspaces() {
    return this.http.get<messageData>(`${environment.BACKEND_URL}/api/my-workspaces`)
  }
}
