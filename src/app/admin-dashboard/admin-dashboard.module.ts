import {NgModule} from "@angular/core";
import {AdminDashboardComponent} from "./admin-dashboard.component";
import {RouterOutlet} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {AdminDashboardRoutingModule} from "./admin-dashboard-routing.module";
import { ManageInvestorsComponent } from './manage-investors/manage-investors.component';
import { ManageStartupsComponent } from './manage-startups/manage-startups.component';
import {NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManageInvestorsComponent,
    ManageStartupsComponent
  ],
    imports: [
        RouterOutlet,
        SharedModule,
        AdminDashboardRoutingModule,
        NgIf,
        NgxPaginationModule
    ],
  exports: [],
  providers: []
})

export class AdminDashboardModule {

}
