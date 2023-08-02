import {messageData} from "../models/interfaces";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AdminDashboardService {

  constructor(private http: HttpClient) {
  }
  getAllInvestors(page: number, perPage: number, filter: string, search: string){
    return this.http.get<messageData>(`${environment.BACKEND_URL}/api/get-all-investors?page=${page}&perPage=${perPage}&filter=${filter}&search=${search}`);
  }

  getInvestorById(id: string){
    return this.http.get<messageData>(`${environment.BACKEND_URL}/api/get-investor/${id}`);
  }

  verifyInvestor(id: string){
    return this.http.patch<messageData>(`${environment.BACKEND_URL}/api/verify-investor`, {id});
  }

  declineInvestor(id: string) {
    return this.http.patch<messageData>(`${environment.BACKEND_URL}/api/decline-investor`, {id});
  }

  getAllStartups(page: number, perPage: number, filter: string, search: string){
    return this.http.get<messageData>(`${environment.BACKEND_URL}/api/get-startups?page=${page}&perPage=${perPage}&filter=${filter}&search=${search}`);
  }
}
