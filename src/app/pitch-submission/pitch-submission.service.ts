import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {messageData, pitchData, repDetails, startupData, startupProfile, supportingDocs} from "../models/interfaces";
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
  private pitchSubject: BehaviorSubject<pitchData>
  public pitch: Observable<pitchData>
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

  public updatePitch() {
    const updatedPitch: any = {}
    this.pitchFormData.forEach((value, key) => {
      if (value === 'null') {
        const realKey = key.startsWith('~') ? key.substr(1) : key;
        updatedPitch[realKey] = null;
      } else {
        updatedPitch[key] = value;
      }
    });
    this.pitchSubject.next(updatedPitch);
  }

  public get startupProfileValid() {
    const {startupName, registrationInfo, registrationCountry,
      industry, stage, country, region, city, website, linkedIn
    } = this.pitchData

    return startupName && industry && stage && country && region && city
  }

  public get pitchDetailsValid() {
    const {amountToRaise, raisedAmount, purpose, equity, startupBio} = this.pitchData
    return amountToRaise && raisedAmount && purpose && equity && startupBio
  }

  public get repDetailsValid() {
    const {repName, position, repBio} = this.pitchData
    return repName && position && repBio;
  }

  getPitch() {
    return this.http.get<messageData>(`${environment.BACKEND_URL}/api/pitch`);
  }

  submitPitch() {
    return this.http.post<messageData>(`${environment.BACKEND_URL}/api/pitch-submission`, this.pitchFormData);
  }
  setData(data: startupData) {
    this.pitchFormData.set('startupName', data.startup_name)
    this.pitchFormData.set('registrationInfo', data.registration_type)
    this.pitchFormData.set('registrationCountry', data.registration_country)
    this.pitchFormData.set('industry', data.industry)
    this.pitchFormData.set('stage', data.stage)
    this.pitchFormData.set('country', data.country)
    this.pitchFormData.set('region', data.region_state)
    this.pitchFormData.set('city', data.city)
    this.pitchFormData.set('website', data.website)
    this.pitchFormData.set('linkedIn', data.linkedin)
    this.pitchFormData.set('raisedAmount', data.raised_amount)
    this.pitchFormData.set('amountToRaise', data.amount_to_raise)
    this.pitchFormData.set('purpose', data.purpose)
    this.pitchFormData.set('equity', data.equity)
    this.pitchFormData.set('startupBio', data.startup_bio)
    this.pitchFormData.set('repName', data.rep_name)
    this.pitchFormData.set('position', data.rep_position)
    this.pitchFormData.set('rep_linkedIn', data.rep_linkedin)
    this.pitchFormData.set('repBio', data.rep_short_bio)
    this.pitchFormData.set('logo', data.logo)
    this.pitchFormData.set('pitch', data.pitch_deck)
    this.pitchFormData.set('video', data.video_pitch)
    this.pitchFormData.set('repId', data.rep_id)
    this.pitchFormData.set('verified', data.verified)
  }


}
