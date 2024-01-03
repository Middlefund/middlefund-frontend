import { Component, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { ActivatedRoute } from '@angular/router';
import { defaultServerError } from '../../utility/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-incorporation-form',
  templateUrl: './incorporation-form.component.html',
  styleUrls: ['./incorporation-form.component.css'],
})
export class IncorporationFormComponent implements OnInit {
  stage: number = 1;
  id: string | null = null;
  isLoading: boolean = false;
  status: 'awaiting review' | 'rejected' | 'incomplete' | 'submitted' =
    'incomplete';
  constructor(
    private incorporationService: CompanyIncorporationService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.isLoading = true;
      this.incorporationService.getCompany(this.id).subscribe({
        next: value => {
          this.isLoading = false;
          this.incorporationService.businessProfileForm.patchValue(value.data);
          this.incorporationService.businessAddress.patchValue(value.data);
          this.status = value.data.status;
        },
        error: err => {
          this.isLoading = false;
          this.toast.error(err.error?.message || defaultServerError);
        },
      });
    }
    this.incorporationService.companyStage.subscribe(value => {
      this.stage = value;
    });

    // this.incorporationService.companyIncorporationForm.valueChanges.subscribe(
    //   () => {
    //     localStorage.setItem(
    //       'companyIncorporation',
    //       JSON.stringify(
    //         this.incorporationService.companyIncorporationForm.value,
    //       ),
    //     );
    //   },
    // );
  }

  isBusinessProfileValid() {
    return this.incorporationService.businessProfileForm.valid;
  }

  isBusinessAddressValid() {
    return this.incorporationService.businessAddress.valid;
  }
}
