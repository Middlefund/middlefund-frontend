import { Component, inject } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { Country, ICountry } from 'country-state-city';

@Component({
  selector: 'app-tin-employment-identification',
  templateUrl: './tin-employment-identification.component.html',
  styleUrls: ['./tin-employment-identification.component.css']
})
export class TinEmploymentIdentificationComponent {
  companyIncorporationForm = inject(CompanyIncorporationService).companyIncorporationForm
  employeeIdentificationForm = inject(CompanyIncorporationService).tinEmploymentIdentificationForm
  category: Array<{name: string, value: string}> = [
    {name: 'Employee', value: 'Employee'},
    {name: 'Employer', value: 'Employer'},
  ]
  idType: Array<{name: string, value: string}> = [
    {name: 'Passport', value: 'Passport'},
    {name: 'Ghana Card', value: 'Ghana Card'},
    {name: 'Voter\' Id', value: 'Voter\' Id'},
  ]
  getCountries: ICountry[] = Country.getAllCountries();
  countries:Array<{name: string, value: string}> = this.getCountries.map(country => ({ name: country.name, value: country.name }));

  constructor(private incorporationService: CompanyIncorporationService) {
  }

  onSubmit() {
    this.incorporationService.updateTinStage(3)
  }

  onPrevious() {
    this.incorporationService.updateTinStage(1)
  }

}
