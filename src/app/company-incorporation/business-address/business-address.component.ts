import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { ToastrService } from 'ngx-toastr';
import { defaultServerError } from '../../utility/constants';

@Component({
  selector: 'app-business-address',
  templateUrl: './business-address.component.html',
  styleUrls: ['./business-address.component.css'],
})
export class BusinessAddressComponent {
  businessAddress = inject(CompanyIncorporationService).businessAddress;
  isLoading = false;

  constructor(
    private companyIncorporationService: CompanyIncorporationService,
    private router: Router,
    private toastService: ToastrService,
  ) {}

  onPrevious() {
    this.companyIncorporationService.updateCompanyProfileStage(1);
  }

  onSubmitBusinessAddress() {
    this.isLoading = true;
    this.companyIncorporationService.submitCompanyInfo().subscribe({
      next: value => {
        this.isLoading = false;
        this.toastService.success(value.message);
        this.router.navigate([
          `/company-incorporation/proprietor/${value.data.id}`,
        ]);
      },
      error: err => {
        this.isLoading = false;
        this.toastService.error(err.error?.message || defaultServerError);
      },
    });
  }
}
