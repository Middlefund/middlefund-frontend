import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminDashboardComponent} from "./admin-dashboard.component";
import {DashboardHomeComponent} from "../shared/dashboard-home/dashboard-home.component";
import {ManageInvestorsComponent} from "./manage-investors/manage-investors.component";
import {ManageStartupsComponent} from "./manage-startups/manage-startups.component";

const settingsModule = () => import('../settings/settings.module').then(x => x.SettingsModule)

const routes: Routes = [
  {path: '', component: AdminDashboardComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: "full"},
      {path: 'home', component: DashboardHomeComponent},
      {path: 'manage-investors', component: ManageInvestorsComponent},
      {path: 'manage-startups', component: ManageStartupsComponent},
      {path: 'settings', loadChildren: settingsModule}
    ]}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminDashboardRoutingModule {

}
