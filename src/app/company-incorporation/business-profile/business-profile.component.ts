import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Country, ICountry} from "country-state-city";
import {registrationInfo} from "../../utility/constants";
import { Router } from '@angular/router';
import { CompanyIncorporationService } from '../company-incorporation.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent {
  // countries:Array<{name: string, value: string}> = Country.getAllCountries().map(country => ({ name: country.name, value: country.name }));
  companyIncorporationForm = inject(CompanyIncorporationService).companyIncorporationForm
  industries: Array<{name: string, value: string}> = [
    {name: 'Legal', value: 'Legal'}
  ]
  constructor(private fb: FormBuilder,
              private router:Router,
              private companyIncorporationService:CompanyIncorporationService) {
  }

  onSubmitBusinessProfile() {
    this.companyIncorporationService.updateStage(2)
  }

  protected readonly registrationInfo = registrationInfo;
  protected readonly FormControl = FormControl;
}
