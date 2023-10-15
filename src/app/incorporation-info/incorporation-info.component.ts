import { Component } from '@angular/core';
import { Country, ICountry } from 'country-state-city';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountsService } from '../accounts/accounts.service';
import { IRequestCountry } from '../models/interfaces';
import { ToastrService } from 'ngx-toastr';
import { defaultServerError } from '../utility/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incorporation-info',
  templateUrl: './incorporation-info.component.html',
  styleUrls: ['./incorporation-info.component.css']
})
export class IncorporationInfoComponent {
  getCountries: ICountry[] = Country.getAllCountries();
  countries:Array<{name: string, value: string}> = this.getCountries.map(country => ({ name: country.name, value: country.name }));
  isLoading:boolean = false;

  constructor(private fb: FormBuilder,
              private accountService: AccountsService,
              private toast: ToastrService,
              private router: Router,) {
  }

  requestCountry = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    country: [null, Validators.required]
  })

  onSubmitRequest = () => {
    if(this.requestCountry.controls.country.value === 'Ghana') {
      this.toast.info('Service is already available for Ghana, You can begin the process right away')
    } else {
      const data: IRequestCountry = {
        country: String(this.requestCountry.controls.country.value),
        email: String(this.requestCountry.controls.email.value)
      }
      this.isLoading = true
      this.accountService.requestCountry(data).subscribe({
        next: value => {
          this.router.navigateByUrl('/').then(r => r)
          this.toast.success(value.message)
          this.isLoading = false
        },
        error: err => {
          this.toast.error(err.error.message || defaultServerError)
          this.isLoading = false
        }
      })
    }
  }
}
