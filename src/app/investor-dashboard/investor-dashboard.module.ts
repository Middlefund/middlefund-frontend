import {NgModule} from "@angular/core";
import {InvestorDashboardComponent} from "./investor-dashboard.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {RouterOutlet} from "@angular/router";
import {InvestorDashboardRoutingModule} from "./investor-dashboard-routing.module";

@NgModule({
  declarations: [
    InvestorDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
    InvestorDashboardRoutingModule
  ],
  exports: [],
  providers: []
})

export class InvestorDashboardModule{}
