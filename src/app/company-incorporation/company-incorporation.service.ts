import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { messageData } from '../models/interfaces';
import { environment } from '../../environments/environment';
import {
  ImessageDataStatus,
  ImessageDataType,
} from '../models/companyIncorporation.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyIncorporationService {
  private stageSubject!: BehaviorSubject<number>;
  public stage!: Observable<number>;
  private companyStageSubject!: BehaviorSubject<number>;
  public companyStage!: Observable<number>;
  private roleStageSubject!: BehaviorSubject<number>;
  public roleStage!: Observable<number>;
  private tinStageSubject!: BehaviorSubject<number>;
  public tinStage!: Observable<number>;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.stageSubject = new BehaviorSubject(1);
    this.stage = this.stageSubject.asObservable();
    this.companyStageSubject = new BehaviorSubject(1);
    this.companyStage = this.companyStageSubject.asObservable();
    this.roleStageSubject = new BehaviorSubject(1);
    this.roleStage = this.roleStageSubject.asObservable();
    this.tinStageSubject = new BehaviorSubject(1);
    this.tinStage = this.tinStageSubject.asObservable();
    this.initializeForm();
  }

  readonly businessProfileForm = this.fb.group({
    companyName: ['', Validators.required],
    companyType: [null, Validators.required],
    businessName: ['', Validators.required],
    industryName: [null, Validators.required],
    activities: ['', Validators.required],
  });

  readonly businessAddress = this.fb.group({
    digitalAddress: ['', Validators.required],
    houseNumber: ['', Validators.required],
    landmark: ['', Validators.required],
    region: ['', Validators.required],
    city: ['', Validators.required],
    district: ['', Validators.required],
    boxNumber: ['', Validators.required],
  });

  readonly companyIncorporationForm = this.fb.group({
    businessProfile: this.businessProfileForm,
    businessAddress: this.businessAddress,
  });

  readonly roleDetailsForm = this.fb.group({
    name: ['', Validators.required],
    gender: [null, Validators.required],
    dob: ['', Validators.required],
    nationality: [null, Validators.required],
    birthPlace: ['', Validators.required],
  });

  readonly roleTinContactForm = this.fb.group({
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    hasTin: [null, Validators.required],
    tin: ['', Validators.required],
  });

  readonly roleProofForm = this.fb.group({
    ghanaCard: this.fb.array([], Validators.required),
    signature: ['', Validators.required],
  });

  readonly tinPersonalDetailsForm = this.fb.group({
    maritalStatus: [null, Validators.required],
    birthCountry: [null, Validators.required],
    birthRegion: [null, Validators.required],
    birthCity: [null, Validators.required],
    isResident: [null, Validators.required],
    maidenLastName: ['', Validators.required],
    motherFirstName: ['', Validators.required],
  });

  readonly tinResidentialAddressForm = this.fb.group({
    houseNumber: ['', Validators.required],
    buildingName: [''],
    streetName: [null, Validators.required],
    country: [null, Validators.required],
    region: [null, Validators.required],
    city: [null, Validators.required],
    district: ['', Validators.required],
    locationArea: ['', Validators.required],
  });

  readonly tinEmploymentIdentificationForm = this.fb.group({
    category: [null],
    employerName: ['', Validators.required],
    idType: [null, Validators.required],
    idNumber: ['', Validators.required],
    issueDate: ['', Validators.required],
    expiryDate: ['', Validators.required],
    issueCountry: [null, Validators.required],
    issuePlace: ['', Validators.required],
  });

  readonly tinContactForm = this.fb.group({
    postalType: [null, Validators.required],
    postalCode: ['', Validators.required],
    boxRegion: ['', Validators.required],
    boxLocationArea: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    website: ['', Validators.required],
    contactMethod: [null, Validators.required],
  });

  readonly tinBusinessDetailsForm = this.fb.group({
    businessNature: [null, Validators.required],
    annualTurnover: ['', Validators.required],
    numberOfEmployees: [null, Validators.required],
    isBusinessRegistered: ['', Validators.required],
    businessName: ['', Validators.required],
    oldTin: ['', Validators.required],
    rgdNumber: ['', Validators.required],
    businessAddress: ['', Validators.required],
    businessBuildingName: ['', Validators.required],
    landMark: ['', Validators.required],
    businessCity: ['', Validators.required],
    businessLocationArea: [''],
    businessPostalCode: [''],
    businessCountry: [''],
    businessRegion: [''],
  });
  public updateCompanyProfileStage(stage: 1 | 2) {
    return this.companyStageSubject.next(stage);
  }

  public updateRoleStage(stage: 1 | 2 | 3) {
    return this.roleStageSubject.next(stage);
  }
  public updateTinStage(stage: number) {
    return this.tinStageSubject.next(stage);
  }
  private initializeForm() {
    const formData = JSON.parse(localStorage.getItem('companyIncorporation')!);
    if (formData) {
      this.companyIncorporationForm.setValue(formData);
    }
  }

  public submitCompanyInfo(id: string | null) {
    const companyInfo = {
      ...this.businessAddress.value,
      ...this.businessProfileForm.value,
    };
    return this.http.post<messageData>(
      `${environment.BACKEND_URL}/api/company-incorporation?id=${id}`,
      companyInfo,
    );
  }

  public getCompanies() {
    return this.http.get<messageData>(
      `${environment.BACKEND_URL}/api/companies`,
    );
  }

  public getCompany(id: string) {
    return this.http.get<messageData>(
      `${environment.BACKEND_URL}/api/get-company/${id}`,
    );
  }

  public submitProprietorDirector(id: string, directorId?: string) {
    const proprietorDirectorInfo = {
      ...this.roleDetailsForm.value,
      ...this.roleTinContactForm.value,
      ...this.roleProofForm.value,
    };
    return this.http.post<ImessageDataType>(
      directorId
        ? `${environment.BACKEND_URL}/api/leader/${id}?id=${directorId}`
        : `${environment.BACKEND_URL}/api/leader/${id}`,
      proprietorDirectorInfo,
    );
  }

  public getProprietor(id: string) {
    return this.http.get<ImessageDataStatus>(
      `${environment.BACKEND_URL}/api/get-proprietor/${id}`,
    );
  }

  public getDirectors(id: string) {
    return this.http.get<ImessageDataStatus>(
      `${environment.BACKEND_URL}/api/directors/${id}`,
    );
  }

  public getDirector(id: string) {
    return this.http.get<ImessageDataStatus>(
      `${environment.BACKEND_URL}/api/director/${id}`,
    );
  }

  public submitDirectors(id: string) {
    return this.http.get<messageData>(
      `${environment.BACKEND_URL}/api/submit-directors/${id}`,
    );
  }

  public submitTinForm(id: string) {
    const tinRegistrationInfo = {
      ...this.tinPersonalDetailsForm.value,
      ...this.tinEmploymentIdentificationForm.value,
      ...this.tinResidentialAddressForm.value,
      ...this.tinContactForm.value,
      ...this.tinResidentialAddressForm.value,
    };
    return this.http.post<ImessageDataType>(
      `${environment.BACKEND_URL}/api/tin-registration/${id}`,
      tinRegistrationInfo,
    );
  }

  public deleteDirector(id: string) {
    return this.http.delete<ImessageDataStatus>(
      `${environment.BACKEND_URL}/api/director/${id}`,
    );
  }
}
