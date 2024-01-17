import { Component, inject, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { City, Country, ICountry, IState, State } from 'country-state-city';

@Component({
  selector: 'app-tin-personal',
  templateUrl: './tin-personal.component.html',
  styleUrls: ['./tin-personal.component.css'],
})
export class TinPersonalComponent implements OnInit {
  tinPersonalDetailsForm = inject(CompanyIncorporationService)
    .tinPersonalDetailsForm;
  maritalStatus: Array<{ name: string; value: string }> = [
    { name: 'Married', value: 'Married' },
    { name: 'Single', value: 'Single' },
    { name: 'Widow', value: 'Widow' },
  ];
  getCountries: ICountry[] = Country.getAllCountries();
  getAllStates: IState[] = [];
  countries: Array<{ name: string; value: string }> = this.getCountries.map(
    country => ({ name: country.name, value: country.name }),
  );
  states: Array<{ name: string; value: string }> = [];
  cities: { name: string; value: string }[] = [];
  findCountry!: ICountry | undefined;
  answer: Array<{ name: string; value: string }> = [
    { name: 'Yes', value: 'yes' },
    { name: 'No', value: 'no' },
  ];

  constructor(private incorporationService: CompanyIncorporationService) {}

  ngOnInit() {
    this.tinPersonalDetailsForm.controls.birthCountry.value &&
      this.setStates(this.tinPersonalDetailsForm.controls.birthCountry.value);
    this.tinPersonalDetailsForm.controls.birthRegion.value &&
      this.setCities(this.tinPersonalDetailsForm.controls.birthRegion.value);
    this.incorporationService.tinPersonalDetailsForm.controls.birthCountry.valueChanges.subscribe(
      value => {
        value && this.setStates(value);
      },
    );

    this.incorporationService.tinPersonalDetailsForm.controls.birthRegion.valueChanges.subscribe(
      value => {
        value && this.setCities(value);
      },
    );
  }

  onSubmit() {
    this.incorporationService.updateTinStage(2);
  }

  setCities(value: string) {
    const findState = this.getAllStates.find(
      (state: { name: string }) => state.name === value,
    );
    if (findState) {
      const getAllCities = City.getCitiesOfState(
        this.findCountry?.isoCode as string,
        findState?.isoCode,
      );
      this.cities = getAllCities.map(city => ({
        name: city.name,
        value: city.name,
      }));
    }
  }

  setStates(value: string) {
    this.findCountry = this.getCountries.find(
      country => country.name === value,
    );

    this.getAllStates = State.getStatesOfCountry(this.findCountry?.isoCode);
    this.states = this.getAllStates.map((state: { name: string }) => ({
      name: state.name,
      value: state.name,
    }));
  }
}
