import {NgModule} from "@angular/core";
import {InvestorDashboardComponent} from "./investor-dashboard.component";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {RouterOutlet} from "@angular/router";
import {InvestorDashboardRoutingModule} from "./investor-dashboard-routing.module";
import { ViewStartupsComponent } from './view-startups/view-startups.component';
import { InvestorVerificationComponent } from './investor-verification/investor-verification.component';
import {MatIconModule} from "@angular/material/icon";
import {SkeletonModule} from "primeng/skeleton";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ViewStartupComponent } from './view-startup/view-startup.component';
import {NgxPaginationModule} from "ngx-pagination";
import { InterestedComponent } from './interested/interested.component';
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [
    InvestorDashboardComponent,
    ViewStartupsComponent,
    InvestorVerificationComponent,
    ViewStartupComponent,
    InterestedComponent
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
    NgxPaginationModule,
    DialogModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [CurrencyPipe]
})

export class InvestorDashboardModule{}
