import { Component, inject } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { Country } from 'country-state-city';
import { genderOptions } from '../../utility/constants';

@Component({
  selector: 'app-proprietor-details',
  templateUrl: './proprietor-details.component.html',
  styleUrls: ['./proprietor-details.component.css'],
})
export class ProprietorDetailsComponent {
  roleDetailsForm = inject(CompanyIncorporationService).roleDetailsForm;
  countries: Array<{ name: string; value: string }> =
    Country.getAllCountries().map(country => ({
      name: country.name,
      value: country.name,
    }));

  constructor(
    private companyIncorporationService: CompanyIncorporationService,
  ) {}

  onSubmit() {
    this.companyIncorporationService.updateRoleStage(2);
  }

  // checkTinBeforeSubmit() {
  //   if (this.companyIncorporationForm.controls.proprietorDetails.controls.hasTin.value === 'yes') {
  //     this.companyIncorporationService.updateStage(3)
  //   } else {
  //     this.visible = true
  //   }
  // }
  //
  // onPrevious(){
  //   this.companyIncorporationService.updateStage(1)
  // }
  //
  // canActivate(){
  //   if(this.companyIncorporationForm.controls.businessProfile.invalid) {
  //     this.companyIncorporationService.updateStage(1)
  //   }
  // }
  //
  // hasTinNumber() {
  //   this.companyIncorporationForm.controls.proprietorDetails.get('hasTin')?.valueChanges.subscribe((value) => {
  //     if(value === 'yes') {
  //       this.companyIncorporationForm.controls.proprietorDetails.get('tin')?.setValidators([Validators.required])
  //     } else {
  //       this.companyIncorporationForm.controls.proprietorDetails.get('tin')?.clearValidators()
  //     }
  //   })
  // }
  protected readonly genderOptions = genderOptions;
}
