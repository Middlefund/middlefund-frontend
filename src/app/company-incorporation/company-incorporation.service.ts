import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { messageData } from '../models/interfaces';
import { environment } from '../../environments/environment';
import { loginData } from '../utility/models';

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
    this.stageSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('stage')!) || 1,
    );
    this.stage = this.stageSubject.asObservable();
    this.companyStageSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('stage')!) || 1,
    );
    this.companyStage = this.companyStageSubject.asObservable();
    this.roleStageSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('stage')!) || 1,
    );
    this.roleStage = this.companyStageSubject.asObservable();
    this.tinStageSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('tinStage')!) || 1,
    );
    this.tinStage = this.tinStageSubject.asObservable();
    this.initializeForm();
    // this.hasTinNumber()
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
    ghanaCard: ['', Validators.required],
    signature: ['', Validators.required],
  });

  readonly tinPersonalDetailsForm = this.fb.group({
    maritalStatus: [null, Validators.required],
    birthCountry: [null, Validators.required],
    birthRegion: [null, Validators.required],
    birthTown: [null, Validators.required],
    nationality: [null, Validators.required],
    resident: [null, Validators.required],
    maidenLastName: ['', Validators.required],
    motherFirstName: ['', Validators.required],
  });

  readonly tinResidentialAddressForm = this.fb.group({
    houseNumber: ['', Validators.required],
    buildingName: [''],
    streetName: [null, Validators.required],
    country: [null, Validators.required],
    region: [null, Validators.required],
    town: [null, Validators.required],
    district: ['', Validators.required],
    location: ['', Validators.required],
    postalCode: ['', Validators.required],
  });

  readonly tinEmploymentIdentificationForm = this.fb.group({
    category: [null, Validators.required],
    employerName: ['', Validators.required],
    idType: [null, Validators.required],
    idNumber: ['', Validators.required],
    issueDate: ['', Validators.required],
    expiryDate: ['', Validators.required],
    issueCountry: ['', Validators.required],
    issuePlace: ['', Validators.required],
  });

  readonly tinContactForm = this.fb.group({
    postalType: [null, Validators.required],
    postalNumber: ['', Validators.required],
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
    businessRegistered: ['', Validators.required],
    businessName: ['', Validators.required],
    oldTin: ['', Validators.required],
    rgdNumber: ['', Validators.required],
    houseNumber: ['', Validators.required],
    buildingName: ['', Validators.required],
    landMark: ['', Validators.required],
    town: ['', Validators.required],
    location: [''],
    postalCode: [''],
    country: [''],
    region: [''],
  });

  readonly tinRegistrationForm = this.fb.group({
    personalDetails: this.tinPersonalDetailsForm,
    employmentIdentification: this.tinEmploymentIdentificationForm,
    residentialAddress: this.tinResidentialAddressForm,
    businessDetails: this.tinBusinessDetailsForm,
    contactDetails: this.tinContactForm,
  });

  public updateCompanyProfileStage(stage: 1 | 2) {
    localStorage.setItem('companyStage', JSON.stringify(stage));
    return this.companyStageSubject.next(stage);
  }

  public updateRoleStage(stage: 1 | 2 | 3) {
    localStorage.setItem('roleStage', JSON.stringify(stage));
    return this.roleStageSubject.next(stage);
  }

  public updateStage(stage: number) {
    localStorage.setItem('stage', JSON.stringify(stage));
    return this.stageSubject.next(stage);
  }

  public updateTinStage(stage: number) {
    localStorage.setItem('tinStage', JSON.stringify(stage));
    return this.tinStageSubject.next(stage);
  }

  public get currentStage() {
    return this.stageSubject.value || 1;
  }

  private initializeForm() {
    const formData = JSON.parse(localStorage.getItem('companyIncorporation')!);
    if (formData) {
      this.companyIncorporationForm.setValue(formData);
    }
  }

  public submitCompanyInfo() {
    const companyInfo = {
      ...this.businessAddress.value,
      ...this.businessProfileForm.value,
    };
    return this.http.post<messageData>(
      `${environment.BACKEND_URL}/api/company-incorporation`,
      companyInfo,
    );
  }

  public getCompanies() {
    return this.http.get<messageData>(
      `${environment.BACKEND_URL}/api/companies`,
    );
  }

  // hasTinNumber() {
  //     if(this.companyIncorporationForm.controls.proprietorDetails.controls.hasTin.value === 'yes') {
  //       this.companyIncorporationForm.controls.proprietorDetails.get('tin')?.setValidators([Validators.required])
  //     } else {
  //       this.companyIncorporationForm.controls.proprietorDetails.get('tin')?.clearValidators()
  //     }
  // }
}
