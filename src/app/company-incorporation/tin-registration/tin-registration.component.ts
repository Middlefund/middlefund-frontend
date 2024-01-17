import { Component, inject, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';

@Component({
  selector: 'app-tin-registration',
  templateUrl: './tin-registration.component.html',
  styleUrls: ['./tin-registration.component.css'],
})
export class TinRegistrationComponent implements OnInit {
  tinStage: number = 1;
  category = '';
  constructor(private incorporationService: CompanyIncorporationService) {}

  ngOnInit() {
    this.incorporationService.tinStage.subscribe(value => {
      this.tinStage = value;
    });

    this.incorporationService.tinEmploymentIdentificationForm.controls.category.valueChanges.subscribe(
      value => {
        this.category = String(value);
      },
    );

    this.incorporationService.companyIncorporationForm.valueChanges.subscribe(
      () => {
        localStorage.setItem(
          'companyIncorporation',
          JSON.stringify(
            this.incorporationService.companyIncorporationForm.value,
          ),
        );
      },
    );
  }

  isTinPersonalValid() {
    return this.incorporationService.tinPersonalDetailsForm.valid;
  }

  isTinEmploymentIdentificationValid() {
    return this.incorporationService.tinEmploymentIdentificationForm.valid;
  }

  isTinResidentialAddressValid() {
    return this.incorporationService.tinResidentialAddressForm.valid;
  }

  isTinContactValid() {
    return this.incorporationService.tinContactForm.valid;
  }

  isTinBusinessDetailsValid() {
    return this.incorporationService.tinBusinessDetailsForm.valid;
  }
}
