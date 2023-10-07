import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {CompanyIncorporationRoutingModule} from "./company-incorporation-routing.module";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CompanyIncorporationRoutingModule
  ]
})
export class CompanyIncorporationModule { }
