import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Country, ICountry} from "country-state-city";
import {registrationInfo} from "../../utility/constants";
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent {
  isLoading = false;
  countries:Array<{name: string, value: string}> = Country.getAllCountries().map(country => ({ name: country.name, value: country.name }));
  constructor(private fb: FormBuilder, private router:Router) {
  }

  businessProfileForm = this.fb.group({
    companyName: ['', Validators.required],
    companyType: [null, Validators.required],
    registrationCountry: [null, Validators.required],
  })

  onSubmitBusinessProfile() {

    this.router.navigate(['/platinum/business-description'])

  }

  protected readonly registrationInfo = registrationInfo;
}
