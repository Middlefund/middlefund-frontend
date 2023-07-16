import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {messageData} from "../models/interfaces";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Form} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class InvestorService {
  constructor(private http: HttpClient) {
  }

  getAllPitches(page: number, perPage: number, filter: string, search: string){
    return this.http.get<messageData>(`${environment.BACKEND_URL}/api/get-pitches?page=${page}&perPage=${perPage}&filter=${filter}&search=${search}`);
  }

  getPitch(id: string) {
    return this.http.get<messageData>(`${environment.BACKEND_URL}/api/get-pitch/${id}`);
  }

  interested(pitchId: string) {
    return this.http.post<messageData>(`${environment.BACKEND_URL}/api/interested`, {pitchId});
  }

  verification(formData: FormData) {
    return this.http.post<messageData>(`${environment.BACKEND_URL}/api/investor-verification`, formData);
  }

  getInvestor() {
    return this.http.get<messageData>(`${environment.BACKEND_URL}/api/get-investor`);
  }

}
