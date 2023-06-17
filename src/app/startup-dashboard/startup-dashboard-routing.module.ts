import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {StartupDashboardComponent} from "./startup-dashboard.component";
import {DashboardHomeComponent} from "../shared/dashboard-home/dashboard-home.component";
import {ViewInvestorsComponent} from "./view-investors/view-investors.component";

const settingsModule = () => import('../settings/settings.module').then(x => x.SettingsModule)
const routes: Routes = [
  {path: '', component: StartupDashboardComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full' },
      {path: 'home', component: DashboardHomeComponent},
      {path: 'view-investors', component: ViewInvestorsComponent},
      {path: 'settings', loadChildren: settingsModule},
    ]}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StartupDashboardRoutingModule {}
