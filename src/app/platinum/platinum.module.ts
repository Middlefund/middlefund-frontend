import {NgModule} from "@angular/core";
import {PlatinumRoutingModule} from "./platinum-routing.module";
import {PlatinumComponent} from "./platinum.component";
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import { CreateWorkspaceComponent } from './create-workspace/create-workspace.component';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';

@NgModule({
  declarations: [
    PlatinumComponent,
    HomeComponent,
    CreateWorkspaceComponent,
    WorkspaceDashboardComponent
  ],
  imports: [
    PlatinumRoutingModule,
    SharedModule,
    MatIconModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  exports: []
})

export class PlatinumModule {}
