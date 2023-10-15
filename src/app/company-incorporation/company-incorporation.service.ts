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
  constructor(private fb: FormBuilder) {
    this.stageSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('stage')!) || 1);
    this.stage = this.stageSubject.asObservable();
    this.tinStageSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('tinStage')!) || 1);
    this.tinStage = this.tinStageSubject.asObservable();
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
    streetName: [null, Validators.required],
    country: [null, Validators.required],
    region: [null, Validators.required],
    town: ['', Validators.required],
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

  readonly companyIncorporationForm = this.fb.group({
    businessProfile: this.businessProfileForm,
    proprietorDetails: this.proprietorDetailsForm,
    proprietorTin: this.proprietorTinPersonalDetailsForm,
    proprietorTinEmploymentIdentification: this.proprietorTinEmploymentIdentificationForm,
    proprietorTinAddress: this.proprietorTinResidentialAddressForm
  });


  public updateStage(stage: number) {
    localStorage.setItem('stage', JSON.stringify(stage));
    return this.stageSubject.next(stage)
  }

  public updateTinStage(stage: number) {
    localStorage.setItem('tinStage', JSON.stringify(stage));
    return this.tinStageSubject.next(stage)
  }

  public get currentStage() {
    return this.stageSubject.value || 1
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
