import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {StartupDashboardComponent} from "./startup-dashboard.component";
import {InvestorDashboardComponent} from "../investor-dashboard/investor-dashboard.component";
import {StartupHomeComponent} from "./startup-home/startup-home.component";

const routes: Routes = [
  {path: '', component: StartupDashboardComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path: 'home', component: StartupHomeComponent}
    ]}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StartupDashboardRoutingModule {}
