import {NgModule} from "@angular/core";
import {StartupDashboardComponent} from "./startup-dashboard.component";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {StartupDashboardRoutingModule} from "./startup-dashboard-routing.module";
import {SharedModule} from "../shared/shared.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { StartupHomeComponent } from './startup-home/startup-home.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    StartupDashboardComponent,
    StartupHomeComponent
  ],
  imports: [
    RouterOutlet,
    StartupDashboardRoutingModule,
    MatIconModule,
    SharedModule,
    MatSlideToggleModule,
    CommonModule,
  ],
  exports: []
})

export class StartupDashboardModule {}
