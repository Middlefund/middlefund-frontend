import { Component } from '@angular/core';
import { Country, ICountry } from 'country-state-city';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  getCountries: ICountry[] = Country.getAllCountries();
  countries:Array<{name: string, value: string}> = this.getCountries.map(country => ({ name: country.name, value: country.name }));
  isLoading:boolean = false;

  constructor(private fb: FormBuilder) {
  }

  requestCountry = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    country: [null, Validators.required]
  })

  onSubmitRequest = () => {

  }
}
