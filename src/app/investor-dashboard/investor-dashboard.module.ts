import {NgModule} from "@angular/core";
import {InvestorDashboardComponent} from "./investor-dashboard.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {RouterOutlet} from "@angular/router";
import {InvestorDashboardRoutingModule} from "./investor-dashboard-routing.module";
import { ViewStartupsComponent } from './view-startups/view-startups.component';
import { InvestorVerificationComponent } from './investor-verification/investor-verification.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    InvestorDashboardComponent,
    ViewStartupsComponent,
    InvestorVerificationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
    InvestorDashboardRoutingModule,
    MatIconModule
  ],
  exports: [],
  providers: []
})

export class InvestorDashboardModule{}
