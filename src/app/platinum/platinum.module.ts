import {NgModule} from "@angular/core";
import {PlatinumRoutingModule} from "./platinum-routing.module";
import {PlatinumComponent} from "./platinum.component";
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import { CreateWorkspaceComponent } from './create-workspace/create-workspace.component';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { TeamsComponent } from './teams/teams.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { BusinessDescriptionComponent } from './business-description/business-description.component';
import { BusinessAddressComponent } from './business-address/business-address.component';
import { ProprietorDetailsComponent } from './proprietor-details/proprietor-details.component';
import { ProprietorDetails2Component } from './proprietor-details2/proprietor-details2.component';

@NgModule({
  declarations: [
    PlatinumComponent,
    HomeComponent,
    CreateWorkspaceComponent,
    WorkspaceDashboardComponent,
    TasksComponent,
    TeamsComponent,
    BusinessProfileComponent,
    BusinessDescriptionComponent,
    BusinessAddressComponent,
    ProprietorDetailsComponent,
    ProprietorDetails2Component
  ],
  imports: [
    PlatinumRoutingModule,
    SharedModule,
    MatIconModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  exports: []
})

export class PlatinumModule {}
