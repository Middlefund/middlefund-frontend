import { Component, OnInit } from '@angular/core';
import { Country, ICountry } from 'country-state-city';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { defaultServerError } from '../../utility/constants';
import { ToastrService } from 'ngx-toastr';
import { ICompanyInformation } from '../../models/companyIncorporation.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  getCountries: ICountry[] = Country.getAllCountries();
  countries: Array<{ name: string; value: string }> = this.getCountries.map(
    country => ({ name: country.name, value: country.name }),
  );
  isLoading: boolean = false;
  companies: ICompanyInformation[] = [];

  constructor(
    private fb: FormBuilder,
    private incorporationService: CompanyIncorporationService,
    private toastService: ToastrService,
  ) {}

  ngOnInit() {
    this.getCompanies();
  }

  requestCountry = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    country: [null, Validators.required],
  });

  onSubmitRequest = () => {};

  getCompanies = () => {
    this.isLoading = true;
    this.incorporationService.getCompanies().subscribe({
      next: value => {
        this.isLoading = false;
        this.companies = value.data;
      },
      error: err => {
        this.isLoading = false;
        this.toastService.error(err.error?.message || defaultServerError);
      },
    });
  };
}
