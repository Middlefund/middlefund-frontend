import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { registrationInfo } from '../../utility/constants';
import { Router } from '@angular/router';
import { CompanyIncorporationService } from '../company-incorporation.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css'],
})
export class BusinessProfileComponent {
  businessProfileForm = inject(CompanyIncorporationService).businessProfileForm;
  industries: Array<{ name: string; value: string }> = [
    { name: 'Legal', value: 'Legal' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private companyIncorporationService: CompanyIncorporationService,
  ) {}

  onSubmitBusinessProfile() {
    this.companyIncorporationService.updateCompanyProfileStage(2);
  }

  protected readonly registrationInfo = registrationInfo;
  protected readonly FormControl = FormControl;
}
