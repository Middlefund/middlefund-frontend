import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {industry} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class PitchSubmissionService {
  constructor(private http: HttpClient) {}

  getIndustries() {
    return this.http.get<industry>(`${environment.BACKEND_URL}/api/getAllIndustries`);
  }
}
