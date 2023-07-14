import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {messageData} from "../models/interfaces";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

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
}
