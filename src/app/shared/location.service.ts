import { Injectable } from '@angular/core';
import { City, Country, State } from 'country-state-city';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  countries:Array<{name: string, value: string}> = Country.getAllCountries().map(country => ({ name: country.name, value: country.name }));

  constructor() { }

  getStatesByCountryOptions(selectedCountry: string)  {
    return this.getStatesByCountry(selectedCountry).map(((state: { name: any; }) => ({name:state.name, value: state.name})))
  }

  private getStatesByCountry (selectedCountry: string){
    const findCountry = Country.getAllCountries().find(country => country.name === selectedCountry)
    return State.getStatesOfCountry(findCountry?.isoCode)
  }

  private getCountryCode (selectedCountry: string){
    const findCountry = Country.getAllCountries().find(country => country.name === selectedCountry)
    return findCountry?.isoCode
  }

  getCitiesByCountry(selectedState: string, selectedCountry: string) {
    const findState = this.getStatesByCountry(selectedCountry).find((state) => state.name === selectedState)
    const getAllCities = City.getCitiesOfState(this.getCountryCode(selectedCountry)!, findState?.isoCode!)
    return getAllCities.map(city => ({name: city.name, value: city.name}))
  }
}
