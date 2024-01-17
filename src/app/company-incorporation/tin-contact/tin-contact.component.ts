import { Component, inject } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { defaultServerError } from '../../utility/constants';

@Component({
  selector: 'app-tin-contact',
  templateUrl: './tin-contact.component.html',
  styleUrls: ['./tin-contact.component.css'],
})
export class TinContactComponent {
  tinContactForm = inject(CompanyIncorporationService).tinContactForm;
  postalTypes: Array<{ name: string; value: string }> = [
    { name: 'Home', value: 'home' },
    { name: 'Work', value: 'work' },
    { name: 'Other', value: 'other' },
  ];

  contactMethods: Array<{ name: string; value: string }> = [
    { name: 'Email', value: 'email' },
    { name: 'Phone', value: 'phone' },
  ];
  isLoading: boolean = false;

  constructor(
    private incorporationService: CompanyIncorporationService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastrService,
    private router: Router,
  ) {}

  onSubmit() {
    if (
      this.incorporationService.tinEmploymentIdentificationForm.controls
        .category.value === 'employee'
    ) {
      this.isLoading = true;
      const id = <string>this.activatedRoute.snapshot.paramMap.get('id');
      this.incorporationService.submitTinForm(id).subscribe({
        next: value => {
          this.isLoading = false;
          this.toastService.success(value.message);
          if (value.type === 'sole proprietorship') {
            this.router.navigate([`/company-incorporation/home`]);
          } else {
            this.router.navigate([
              `/company-incorporation/directors/${value.data}`,
            ]);
          }
        },
        error: err => {
          this.isLoading = false;
          this.toastService.error(err.error?.message || defaultServerError);
        },
      });
    } else {
      this.incorporationService.updateTinStage(5);
    }
  }

  onPrevious() {
    this.incorporationService.updateTinStage(3);
  }
}
