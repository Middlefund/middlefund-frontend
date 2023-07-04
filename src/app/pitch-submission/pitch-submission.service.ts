import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {messageData, pitchData, pitchDetails, repDetails, startupData, startupProfile} from "../models/interfaces";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PitchSubmissionService {
  startupProfile: any
  pitchDetails: any
  repDetails: any
  pitchFormData = new FormData();
  private pitchSubject: BehaviorSubject<startupData>
  public pitch: Observable<startupData>
  constructor(private http: HttpClient) {
    this.pitchSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('pitch')!));
    this.pitch = this.pitchSubject.asObservable()
  }

  getIndustries() {
    return this.http.get<messageData>(`${environment.BACKEND_URL}/api/getAllIndustries`);
  }

  public get pitchData() {
    return this.pitchSubject.value
  }

  public get startupProfileValid() {
    const {startup_name, registration_type, registration_country,
      industry, stage, country, region_state, city, website, linkedin
    } = this.pitchData

    return startup_name && industry && stage && country && region_state && city
  }



  saveStartupProfile(startupProfile: startupProfile) {
    this.startupProfile = startupProfile;
  }

  savePitchDetails(pitchDetails: pitchDetails) {
    this.pitchDetails = pitchDetails;
  }

  saveRepDetails(repDetails: repDetails) {
    this.repDetails = repDetails
  }

  getPitch() {
    return this.http.get<messageData>(`${environment.BACKEND_URL}/api/pitch`);
  }

  submitPitch() {
    return this.http.patch<messageData>(`${environment.BACKEND_URL}/api/pitch-submission`, this.pitchFormData);
  }

  submitStartupProfile(startupProfile: any) {
    return this.http.patch<messageData>(`${environment.BACKEND_URL}/api/startup-profile`, startupProfile)
  }

  submitPitchDetails(pitchDetails: pitchDetails) {
    return this.http.patch<messageData>(`${environment.BACKEND_URL}/api/pitch-details`, pitchDetails)
  }

}
