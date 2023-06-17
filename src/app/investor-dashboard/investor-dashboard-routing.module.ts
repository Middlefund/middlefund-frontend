import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {InvestorDashboardComponent} from "./investor-dashboard.component";
import {DashboardHomeComponent} from "../shared/dashboard-home/dashboard-home.component";

const routes: Routes = [
  {path: '', component: InvestorDashboardComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: "full"},
      {path: 'home', component: DashboardHomeComponent},
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InvestorDashboardRoutingModule {}
