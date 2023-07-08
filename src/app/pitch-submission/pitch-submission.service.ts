import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {messageData, pitchData, pitchDetails, repDetails, startupData, startupProfile} from "../models/interfaces";
import {BehaviorSubject, Observable} from "rxjs";

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}

const headers= new HttpHeaders()
  .set('content-type', '')

const options = {
  headers: new HttpHeaders().set('enctype', 'multipart/form-data')
    .set('Content-Type', 'multipart/form-data')
};

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
    return this.pitchSubject.value || false;
  }

  public updatePitch(pitch: any) {
    this.pitchSubject.next(pitch);
  }

  public get startupProfileValid() {
    const {startup_name, registration_type, registration_country,
      industry, stage, country, region_state, city, website, linkedin
    } = this.pitchData

    return startup_name && industry && stage && country && region_state && city
  }

  public get pitchDetailsValid() {
    const {amount_to_raise, raised_amount, purpose, equity, startup_bio} = this.pitchData
    return amount_to_raise && raised_amount && purpose && equity && startup_bio
  }

  public get repDetailsValid() {
    const {rep_name, rep_position, rep_short_bio} = this.pitchData
    return rep_name && rep_position && rep_short_bio;
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

  submitRepDetails(repDetails: repDetails) {
    return this.http.patch<messageData>(`${environment.BACKEND_URL}/api/rep-details`, repDetails)
  }

  submitSupportingDocs(supportingDocs: any) {
    return this.http.post<messageData>(`${environment.BACKEND_URL}/api/supporting-docs`, supportingDocs)
  }

  getFileLink(link: string) {
    return this.http.get(link, {responseType: 'blob'})
  }

}
