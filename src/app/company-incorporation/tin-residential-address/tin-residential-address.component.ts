import { Component, inject, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { City, Country, ICountry, IState, State } from 'country-state-city';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tin-residential-address',
  templateUrl: './tin-residential-address.component.html',
  styleUrls: ['./tin-residential-address.component.css'],
})
export class TinResidentialAddressComponent implements OnInit {
  tinResidentialAddressForm = inject(CompanyIncorporationService)
    .tinResidentialAddressForm;
  getCountries: ICountry[] = Country.getAllCountries();
  getAllStates: IState[] = [];
  countries: Array<{ name: string; value: string }> = this.getCountries.map(
    country => ({ name: country.name, value: country.name }),
  );
  states: Array<{ name: string; value: string }> = [];
  cities: { name: string; value: string }[] = [];
  findCountry!: ICountry | undefined;

  constructor(
    private incorporationService: CompanyIncorporationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.tinResidentialAddressForm
      ?.get('country')
      ?.valueChanges.subscribe(value => {
        value && this.setStates(value);
      });
    this.tinResidentialAddressForm
      .get('region')
      ?.valueChanges.subscribe(value => {
        value && this.setCities(value);
      });
  }

  onSubmit() {
    this.incorporationService.updateTinStage(4);
  }

  onPrevious() {
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
