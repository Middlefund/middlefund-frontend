import {NgModule} from "@angular/core";
import {InvestorDashboardComponent} from "./investor-dashboard.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {RouterOutlet} from "@angular/router";
import {InvestorDashboardRoutingModule} from "./investor-dashboard-routing.module";
import { ViewStartupsComponent } from './view-startups/view-startups.component';
import { InvestorVerificationComponent } from './investor-verification/investor-verification.component';
import {MatIconModule} from "@angular/material/icon";
import {SkeletonModule} from "primeng/skeleton";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {FormsModule} from "@angular/forms";
import { ViewStartupComponent } from './view-startup/view-startup.component';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    InvestorDashboardComponent,
    ViewStartupsComponent,
    InvestorVerificationComponent,
    ViewStartupComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterOutlet,
        InvestorDashboardRoutingModule,
        MatIconModule,
        SkeletonModule,
        NgxSkeletonLoaderModule,
        FormsModule,
        NgxPaginationModule
    ],
  exports: [],
  providers: []
})

export class InvestorDashboardModule{}
