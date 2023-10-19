import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyIncorporationService {
  private stageSubject!: BehaviorSubject<number>
  public stage!: Observable<number>
  private tinStageSubject!: BehaviorSubject<number>
  public tinStage!: Observable<number>
  private tinSkipperSubject!: BehaviorSubject<number>
  public tinSkipper!: Observable<number>
  constructor(private fb: FormBuilder) {
    this.stageSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('stage')!) || 1);
    this.stage = this.stageSubject.asObservable();
    this.tinStageSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('tinStage')!) || 1);
    this.tinStage = this.tinStageSubject.asObservable();
    this.tinSkipperSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('tinSkipper')!) || 0);
    this.tinSkipper = this.tinSkipperSubject.asObservable();
    this.initializeForm()
    this.hasTinNumber()
  }

  readonly businessProfileForm = this.fb.group({
    companyName: ['', Validators.required],
    companyType: [null, Validators.required],
    businessName: ['', Validators.required],
    industryName: [null, Validators.required],
    activities: ['', Validators.required]
  })

  readonly proprietorDetailsForm = this.fb.group({
    name: ['', Validators.required],
    gender: [null, Validators.required],
    dob: ['', Validators.required],
    nationality: [null, Validators.required],
    tin: [''],
    hasTin: [null, Validators.required]
  })

  readonly proprietorTinPersonalDetailsForm = this.fb.group({
    maritalStatus: [null, Validators.required],
    birthCountry: [null, Validators.required],
    birthRegion: [null, Validators.required],
    birthTown: [null, Validators.required],
    nationality: [null, Validators.required],
    resident: [null, Validators.required],
    maidenLastName: ['', Validators.required],
    motherFirstName: ['', Validators.required],
  })

  readonly proprietorTinResidentialAddressForm = this.fb.group({
    houseNumber: ['', Validators.required],
    buildingName: [''],
    streetName: ['', Validators.required],
    country: [null, Validators.required],
    region: [null, Validators.required],
    town: [null, Validators.required],
    district: ['', Validators.required],
    location: ['', Validators.required],
    postalCode: ['', Validators.required],
  })

  readonly proprietorTinEmploymentIdentificationForm = this.fb.group({
    category: [null, Validators.required],
    employerName: ['', Validators.required],
    idType: [null, Validators.required],
    idNumber: ['', Validators.required],
    issueDate: ['', Validators.required],
    expiryDate: ['', Validators.required],
    issueCountry: ['', Validators.required],
    issuePlace: ['', Validators.required],
  })

  readonly proprietorTinPostalContactForm = this.fb.group({
    postalType: [null, Validators.required],
    postalNumber: ['', Validators.required],
    boxRegion: ['', Validators.required],
    locationArea: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', Validators.required],
    website: [''],
    preferredContactMethod: [null, Validators.required],
  })

  readonly tinBusinessDetailsForm = this.fb.group({
    industry: [null, Validators.required],
    annualTurnOver: ['', Validators.required],
    numberOfEmployees: ['', Validators.required],
    isRegistered: [null, Validators.required],
    businessName: ['', Validators.required],
    oldTin: ['', Validators.required],
    RGDN: ['', Validators.required],
    houseNumber: ['', Validators.required],
    buildingName: ['', Validators.required],
    streetName: ['', Validators.required],
    country: [null, Validators.required],
    region: [null, Validators.required],
    city: [null, Validators.required],
    postalCode: ['', Validators.required],
    location: ['', Validators.required],
    signature: ['', Validators.required]
  })

  readonly companyIncorporationForm = this.fb.group({
    businessProfile: this.businessProfileForm,
    proprietorDetails: this.proprietorDetailsForm,
    proprietorTin: this.proprietorTinPersonalDetailsForm,
    proprietorTinEmploymentIdentification: this.proprietorTinEmploymentIdentificationForm,
    proprietorTinAddress: this.proprietorTinResidentialAddressForm,
    proprietorTinContact: this.proprietorTinPostalContactForm
  });


  public updateStage(stage: number) {
    localStorage.setItem('stage', JSON.stringify(stage));
    return this.stageSubject.next(stage)
  }

  public updateTinStage(stage: number) {
    localStorage.setItem('tinStage', JSON.stringify(stage));
    return this.tinStageSubject.next(stage)
  }
  public updateTinSkipper(value: number) {
    localStorage.setItem('tinSkipper', JSON.stringify(value));
    return this.tinStageSubject.next(value)
  }

  private initializeForm() {
    const formData = JSON.parse(localStorage.getItem('companyIncorporation')!)
    if(formData) {
      this.companyIncorporationForm.setValue(formData)
    }
  }

  hasTinNumber() {
      if(this.companyIncorporationForm.controls.proprietorDetails.controls.hasTin.value === 'yes') {
        this.companyIncorporationForm.controls.proprietorDetails.get('tin')?.setValidators([Validators.required])
      } else {
        this.companyIncorporationForm.controls.proprietorDetails.get('tin')?.clearValidators()
      }
  }
}
