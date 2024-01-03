import { Component, inject, Input } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() route: string = '';
  @Input() routeName: string = '';
  readonly injectRouter = inject(Router);

  constructor(
    private companyIncorporationService: CompanyIncorporationService,
    private router: Router,
  ) {}

  calculateCompanyCompletionPercentage(): number {
    const totalBusinessProfileControls = Object.keys(
      this.companyIncorporationService.businessProfileForm.controls,
    ).length;
    const totalBusinessAddressControls = Object.keys(
      this.companyIncorporationService.businessAddress.controls,
    ).length;

    const validBusinessProfileControls = Object.values(
      this.companyIncorporationService.businessProfileForm.controls,
    ).filter(control => control.valid).length;
    const validBusinessAddressControls = Object.values(
      this.companyIncorporationService.businessAddress.controls,
    ).filter(control => control.valid).length;

    if (totalBusinessProfileControls + totalBusinessAddressControls === 0) {
      return 0;
    }

    return Math.round(
      ((validBusinessAddressControls + validBusinessProfileControls) /
        (totalBusinessProfileControls + totalBusinessAddressControls)) *
        100,
    );
  }

  calculateRoleCompletionPercentage(): number {
    const totalRoleProfileControls = Object.keys(
      this.companyIncorporationService.roleDetailsForm.controls,
    ).length;
    const totalTinContactControls = Object.keys(
      this.companyIncorporationService.roleTinContactForm.controls,
    ).length;
    const totalProofControls = Object.keys(
      this.companyIncorporationService.roleProofForm.controls,
    ).length;

    const validRoleProfileControls = Object.values(
      this.companyIncorporationService.roleDetailsForm.controls,
    ).filter(control => control.valid).length;
    const validTinContactControls = Object.values(
      this.companyIncorporationService.roleTinContactForm.controls,
    ).filter(control => control.valid).length;
    console.log(validTinContactControls);
    const validProofControls = Object.values(
      this.companyIncorporationService.roleProofForm.controls,
    ).filter(control => control.valid).length;

    if (
      totalRoleProfileControls +
        totalTinContactControls +
        totalProofControls ===
      0
    ) {
      return 0;
    }

    return Math.round(
      ((validTinContactControls +
        validRoleProfileControls +
        validProofControls) /
        (totalRoleProfileControls +
          totalTinContactControls +
          totalProofControls)) *
        100,
    );
  }

  protected readonly String = String;
}
