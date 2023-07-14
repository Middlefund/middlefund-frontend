import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {InvestorDashboardComponent} from "./investor-dashboard.component";
import {DashboardHomeComponent} from "../shared/dashboard-home/dashboard-home.component";
import {ViewStartupsComponent} from "./view-startups/view-startups.component";
import {InvestorVerificationComponent} from "./investor-verification/investor-verification.component";
import {ViewStartupComponent} from "./view-startup/view-startup.component";

const settingsModule = () => import('../settings/settings.module').then(x => x.SettingsModule)
const routes: Routes = [
  {path: '', component: InvestorDashboardComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: "full"},
      {path: 'home', component: DashboardHomeComponent},
      {path: 'view-startups', component: ViewStartupsComponent},
      {path: 'view-startup/:id', component: ViewStartupComponent},
      {path: 'investor-verification', component: InvestorVerificationComponent},
      {path: 'settings', loadChildren: settingsModule}
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InvestorDashboardRoutingModule {}
