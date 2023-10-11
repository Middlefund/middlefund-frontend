import {RouterModule, Routes} from "@angular/router";
import {PlatinumComponent} from "./platinum.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {CreateWorkspaceComponent} from "./create-workspace/create-workspace.component";
import {WorkspaceDashboardComponent} from "./workspace-dashboard/workspace-dashboard.component";
import {TasksComponent} from "./tasks/tasks.component";
import {TeamsComponent} from "./teams/teams.component";
import {BusinessProfileComponent} from "../company-incorporation/business-profile/business-profile.component";
import {BusinessDescriptionComponent} from "../company-incorporation/business-description/business-description.component";
import { BusinessAddressComponent } from "../company-incorporation/business-address/business-address.component";
import { ProprietorDetailsComponent } from "../company-incorporation/proprietor-details/proprietor-details.component";
import { ProprietorDetails2Component } from "../company-incorporation/proprietor-details2/proprietor-details2.component";
import { BillingComponent } from "../company-incorporation/billing/billing.component";

const routes: Routes = [
  {path: '', component: PlatinumComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'create-workspace', component: CreateWorkspaceComponent},
      {path: 'dashboard', component: WorkspaceDashboardComponent, children: [
          { path: '', redirectTo: 'tasks', pathMatch: 'full' },
          { path: 'tasks', component: TasksComponent },
          { path: 'team', component: TeamsComponent },
        ]},
    ]},
    {path: 'business-profile', component: BusinessProfileComponent},
    {path: 'business-description', component: BusinessDescriptionComponent},
    {path: 'business-address', component:BusinessAddressComponent},
    {path: 'proprietor-details', component:ProprietorDetailsComponent},
    {path: 'proprietor-details-2', component:ProprietorDetails2Component},
    {path: 'billing', component:BillingComponent}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PlatinumRoutingModule {}
