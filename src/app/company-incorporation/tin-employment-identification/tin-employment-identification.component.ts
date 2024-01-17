import { Component, inject, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { Country, ICountry } from 'country-state-city';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-tin-employment-identification',
  templateUrl: './tin-employment-identification.component.html',
  styleUrls: ['./tin-employment-identification.component.css'],
})
export class TinEmploymentIdentificationComponent implements OnInit {
  employeeIdentificationForm = inject(CompanyIncorporationService)
    .tinEmploymentIdentificationForm;
  category: Array<{ name: string; value: string }> = [
    { name: 'Employee', value: 'employee' },
    { name: 'Employer', value: 'employer' },
  ];
  idType: Array<{ name: string; value: string }> = [
    { name: 'Passport', value: 'passport' },
    { name: 'Ghana Card', value: 'ghana card' },
    { name: "Driver's License", value: "driver's license" },
  ];
  getCountries: ICountry[] = Country.getAllCountries();
  countries: Array<{ name: string; value: string }> = this.getCountries.map(
    country => ({ name: country.name, value: country.name }),
  );

  constructor(private incorporationService: CompanyIncorporationService) {}

  ngOnInit() {
    this.employeeIdentificationForm.controls.category.valueChanges.subscribe(
      value => {
        if (value === 'Employee') {
          this.employeeIdentificationForm.controls.employerName.setValidators(
            Validators.required,
          );
          this.employeeIdentificationForm.controls.employerName.updateValueAndValidity();
        } else {
          this.employeeIdentificationForm.controls.employerName.setValidators(
            [],
          );
          this.employeeIdentificationForm.controls.employerName.updateValueAndValidity();
        }
      },
    );
  }

  onSubmit() {
    this.incorporationService.updateTinStage(3);
  }

  onPrevious() {
    this.incorporationService.updateTinStage(1);
  }
}
