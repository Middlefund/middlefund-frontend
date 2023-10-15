import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {CompanyIncorporationRoutingModule} from "./company-incorporation-routing.module";
import {BillingComponent} from "./billing/billing.component";
import {BusinessDescriptionComponent} from "./business-description/business-description.component";
import {BusinessProfileComponent} from "./business-profile/business-profile.component";
import {BusinessAddressComponent} from "./business-address/business-address.component";
import {ProprietorDetails2Component} from "./proprietor-details2/proprietor-details2.component";
import {ProprietorDetailsComponent} from "./proprietor-details/proprietor-details.component";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IncorporationFormComponent } from './incorporation-form/incorporation-form.component';



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
    IncorporationFormComponent
  ],
  exports: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    CompanyIncorporationRoutingModule,
    MatIconModule,
    SharedModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
})
export class CompanyIncorporationModule { }
