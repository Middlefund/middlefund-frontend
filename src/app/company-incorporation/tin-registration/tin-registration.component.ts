import { Component, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';

@Component({
  selector: 'app-tin-registration',
  templateUrl: './tin-registration.component.html',
  styleUrls: ['./tin-registration.component.css']
})
export class TinRegistrationComponent implements OnInit{
  tinStage: number = 1
  skipper: number = 0

  constructor(private incorporationService: CompanyIncorporationService) {
  }

  ngOnInit() {
    this.incorporationService.tinStage.subscribe((value) => {
      this.tinStage = value
    })

    this.incorporationService.companyIncorporationForm.valueChanges.subscribe(() => {
      localStorage.setItem('companyIncorporation', JSON.stringify(this.incorporationService.companyIncorporationForm.value))
    })
  }

  isTinPersonalValid () {
    return this.incorporationService.proprietorTinPersonalDetailsForm.valid
  }

  isTinEmploymentIdentificationValid () {
    return this.incorporationService.proprietorTinEmploymentIdentificationForm.valid
  }

  isTinAddressValid () {
    return this.incorporationService.proprietorTinResidentialAddressForm.valid
  }

  isTinContactValid () {
    return this.incorporationService.proprietorTinPostalContactForm.valid
  }
}
