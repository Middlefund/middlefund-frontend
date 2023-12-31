import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
  ) {}

  onPrevious() {
    this.companyIncorporationService.updateCompanyProfileStage(1);
  }

  onSubmitBusinessAddress() {
    this.isLoading = true;
    this.companyIncorporationService
      .submitCompanyInfo(this.activatedRoute.snapshot.queryParamMap.get('id'))
      .subscribe({
        next: value => {
          this.isLoading = false;
          this.toastService.success(value.message);
          if (
            this.companyIncorporationService.businessProfileForm.controls
              .companyType.value === 'Sole proprietorship'
          ) {
            this.router.navigate([
              `/company-incorporation/proprietor/${value.data.id}`,
            ]);
          } else {
          }
        },
        error: err => {
          this.isLoading = false;
          this.toastService.error(err.error?.message || defaultServerError);
        },
      });
  }
}
