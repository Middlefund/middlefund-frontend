import { Component, inject, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { City, Country, ICountry, State } from 'country-state-city';

@Component({
  selector: 'app-tin-personal',
  templateUrl: './tin-personal.component.html',
  styleUrls: ['./tin-personal.component.css']
})
export class TinPersonalComponent implements OnInit{
  companyIncorporationForm = inject(CompanyIncorporationService).companyIncorporationForm
  maritalStatus: Array<{name: string, value: string}> = [
    {name: 'Married', value: 'Married'},
    {name: 'Single', value: 'Single'},
    {name: 'Widow', value: 'Widow'},
  ]
  getCountries: ICountry[] = Country.getAllCountries();
  getAllStates: any
  countries:Array<{name: string, value: string}> = this.getCountries.map(country => ({ name: country.name, value: country.name }));
  states: any
  cities: any
  findCountry: any
  answer: Array<{name:string, value:string}> = [
    {name:'Yes', value:'yes'},
    {name:'No', value:'no'}
  ]

  constructor(private incorporationService: CompanyIncorporationService) {
  }

  ngOnInit() {
    this.companyIncorporationForm.controls.proprietorTin.controls.birthCountry.valueChanges.subscribe(value => {
      this.setStates(value)
    })

    this.companyIncorporationForm.controls.proprietorTin.controls.birthRegion.valueChanges.subscribe(value => {
      this.setCities(value)
    })
  }

  onSubmit() {
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
