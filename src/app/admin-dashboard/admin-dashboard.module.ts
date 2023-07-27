import {NgModule} from "@angular/core";
import {AdminDashboardComponent} from "./admin-dashboard.component";
import {RouterOutlet} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {AdminDashboardRoutingModule} from "./admin-dashboard-routing.module";
import { ManageInvestorsComponent } from './manage-investors/manage-investors.component';
import { ManageStartupsComponent } from './manage-startups/manage-startups.component';
import {CommonModule, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {DialogModule} from "primeng/dialog";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManageInvestorsComponent,
    ManageStartupsComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    AdminDashboardRoutingModule,
    NgIf,
    NgxPaginationModule,
    DialogModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule
  ],
  exports: [],
  providers: []
})

export class AdminDashboardModule {

}
