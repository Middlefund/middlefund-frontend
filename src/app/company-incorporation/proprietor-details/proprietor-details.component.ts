import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Options } from 'autoprefixer';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { Country } from 'country-state-city';
import { CompanyIncorporationComponent } from '../company-incorporation.component';
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

  // gender: Array<{name:string, value:string}> = [
  //    {name:'Male', value:'male'},
  //    {name:'Female', value:'female'},
  //    {name:'Other', value:'other'}
  //   ]
  //   answer: Array<{name:string, value:string}> = [
  //     {name:'Yes', value:'yes'},
  //     {name:'No', value:'no'}
  //    ]
  // companyIncorporationForm = inject(CompanyIncorporationService).companyIncorporationForm
  // visible: boolean = false
  // constructor(private companyIncorporationService: CompanyIncorporationService,
  //             private router: Router){}
  //
  // ngOnInit(): void {
  //   this.canActivate()
  //   this.hasTinNumber()
  // }
  //
  // onSubmitProprietorDetails(){
  //   this.router.navigateByUrl('company-incorporation/tin-registration').then(r => r)
  // }
  //
  // onCancel(){
  //   this.visible = false
  //   this.router.navigateByUrl('company-incorporation/home').then(r => r)
  // }
  //
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
