import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {StartupDashboardComponent} from "./startup-dashboard.component";
import {InvestorDashboardComponent} from "../investor-dashboard/investor-dashboard.component";
import {StartupHomeComponent} from "./startup-home/startup-home.component";
import {ViewInvestorsComponent} from "./view-investors/view-investors.component";

const routes: Routes = [
  {path: '', component: StartupDashboardComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path: 'home', component: StartupHomeComponent},
      {path: 'view-investors', component: ViewInvestorsComponent}
    ]}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StartupDashboardRoutingModule {}
