import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {messageData, pitchDetails, repDetails, startupData, startupProfile, supportingDocs} from "../models/interfaces";
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

  public get startupProfile(): startupProfile {
    const pitch = this.pitchData
    return {
      startupName: pitch.startup_name,
      registrationInfo: pitch.registration_type,
      industry: pitch.industry,
      registrationCountry: pitch.registration_country,
      stage: pitch.stage,
      location: {
        country: pitch.country,
        city: pitch.city,
        region: pitch.region_state
      },
      social: {
        website: pitch.website,
        linkedIn: pitch.linkedin
      }
    }
  }

  public get pitchDetails(): pitchDetails {
    const pitch = this.pitchData
    return {
      raisedAmount:  pitch.raised_amount,
      amountToRaise: pitch.amount_to_raise,
      purpose: pitch.purpose,
      equity: pitch.equity,
      startupBio: pitch.startup_bio
    }
  }

  public get repDetails(): repDetails {
    const pitch = this.pitchData
    return {
      repName: pitch.rep_name,
      position: pitch.rep_position,
      linkedIn: pitch.rep_linkedin,
      repBio: pitch.rep_short_bio
    }
  }

  public get supportingDocs(): supportingDocs {
    const pitch = this.pitchData
    return {
      logo: pitch.logo,
      pitch: pitch.pitch_deck,
      video: pitch.video_pitch,
      id: pitch.rep_id
    }
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
