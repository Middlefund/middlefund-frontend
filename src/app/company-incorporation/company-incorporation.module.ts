import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CompanyIncorporationRoutingModule } from './company-incorporation-routing.module';
import { BillingComponent } from './billing/billing.component';
import { BusinessDescriptionComponent } from './business-description/business-description.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { BusinessAddressComponent } from './business-address/business-address.component';
import { ProprietorDetails2Component } from './proprietor-details2/proprietor-details2.component';
import { ProprietorDetailsComponent } from './proprietor-details/proprietor-details.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IncorporationFormComponent } from './incorporation-form/incorporation-form.component';
import { TinRegistrationComponent } from './tin-registration/tin-registration.component';
import { TinPersonalComponent } from './tin-personal/tin-personal.component';
import { TinEmploymentIdentificationComponent } from './tin-employment-identification/tin-employment-identification.component';
import { TinResidentialAddressComponent } from './tin-residential-address/tin-residential-address.component';
import { TinContactComponent } from './tin-contact/tin-contact.component';
import { TinBusinessDetailsComponent } from './tin-business-details/tin-business-details.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProprietorDirectorComponent } from './proprietor-director/proprietor-director.component';
import { ProprietorTinContactComponent } from './proprietor-tin-contact/proprietor-tin-contact.component';
import { ProprietorSignatureDeclarationComponent } from './proprietor-signature-declaration/proprietor-signature-declaration.component';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';

@NgModule({
  declarations: [
    HomeComponent,
    BillingComponent,
    BusinessDescriptionComponent,
    BusinessProfileComponent,
    BusinessAddressComponent,
    ProprietorDetails2Component,
    ProprietorDetailsComponent,
    NavbarComponent,
    IncorporationFormComponent,
    IncorporationFormComponent,
    TinRegistrationComponent,
    TinPersonalComponent,
    TinEmploymentIdentificationComponent,
    TinResidentialAddressComponent,
    TinContactComponent,
    TinBusinessDetailsComponent,
    ProprietorDirectorComponent,
    ProprietorTinContactComponent,
    ProprietorSignatureDeclarationComponent,
  ],
  exports: [NavbarComponent],
  imports: [
    CommonModule,
    CompanyIncorporationRoutingModule,
    MatIconModule,
    SharedModule,
    ReactiveFormsModule,
    MatTooltipModule,
    ProgressBarModule,
    NgCircleProgressModule,
    ToastModule,
    FileUploadModule,
    AngularSignaturePadModule,
  ],
  providers: [MessageService],
})
export class CompanyIncorporationModule {}
