import {NgModule} from "@angular/core";
import {LogoComponent} from "./logo/logo.component";
import { ButtonComponent } from './button/button.component';
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AlertComponent} from "../alert/alert.component";
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterLink} from "@angular/router";
import { FlipBoxComponent } from './flip-box/flip-box.component';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import {MatIconModule} from "@angular/material/icon";
import { DashboardFooterComponent } from './dashboard-footer/dashboard-footer.component';
import { NotificationsPanelComponent } from './notifications-panel/notifications-panel.component';
import { DashboardAsideComponent } from './dashboard-aside/dashboard-aside.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';

@NgModule({
  declarations: [
    LogoComponent,
    ButtonComponent,
    NotFoundComponent,
    FlipBoxComponent,
    StatsCardComponent,
    UnderConstructionComponent,
    DashboardFooterComponent,
    NotificationsPanelComponent,
    DashboardAsideComponent,
    ProfileDropdownComponent,
  ],
  imports: [
    CommonModule,
    NgClass,
    MatProgressSpinnerModule,
    NgIf,
    RouterLink,
    MatIconModule

  ],
  exports: [
    LogoComponent,
    ButtonComponent,
    FlipBoxComponent,
    StatsCardComponent,
    DashboardFooterComponent,
    NotificationsPanelComponent,
    DashboardAsideComponent,
    ProfileDropdownComponent,
  ]
})

export class SharedModule{}
