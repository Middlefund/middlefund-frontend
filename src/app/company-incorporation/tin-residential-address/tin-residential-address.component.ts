import { Component, inject, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { City, Country, ICountry, State } from 'country-state-city';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tin-residential-address',
  templateUrl: './tin-residential-address.component.html',
  styleUrls: ['./tin-residential-address.component.css']
})
export class TinResidentialAddressComponent implements OnInit{
  companyIncorporationForm = inject(CompanyIncorporationService).companyIncorporationForm
  getCountries: ICountry[] = Country.getAllCountries();
  getAllStates: any
  countries:Array<{name: string, value: string}> = this.getCountries.map(country => ({ name: country.name, value: country.name }));
  states: any
  cities: any
  findCountry: any

  constructor(private incorporationService: CompanyIncorporationService,
              private router: Router) {
  }

  ngOnInit() {
    this.companyIncorporationForm.controls.proprietorTinAddress.controls.country.valueChanges.subscribe(value => {
      this.setStates(value)
    })

    this.companyIncorporationForm.controls.proprietorTinAddress.controls.region.valueChanges.subscribe(value => {
      this.setCities(value)
    })
  }

  onSubmit = () => {
    this.incorporationService.updateTinStage(4)
  }

  onPrevious() {
    this.incorporationService.updateTinStage(2)
  }

  setCities(value: any) {
    const findState = this.getAllStates.find((state: { name: null; }) => state.name === value)
    const getAllCities = City.getCitiesOfState(this.findCountry?.isoCode, findState?.isoCode)
    this.cities = getAllCities.map(city => ({name: city.name, value: city.name}))
  }

  setStates(value: any) {
    this.findCountry = this.getCountries.find(country => country.name === value)
    this.getAllStates = State.getStatesOfCountry(this.findCountry?.isoCode)
    this.states = this.getAllStates.map(((state: { name: any; }) => ({name:state.name, value: state.name})))
  }
}
