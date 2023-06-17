import {NgModule} from "@angular/core";
import {LogoComponent} from "./logo/logo.component";
import { ButtonComponent } from './button/button.component';
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AlertComponent} from "../alert/alert.component";
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { FlipBoxComponent } from './flip-box/flip-box.component';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import {MatIconModule} from "@angular/material/icon";
import { DashboardFooterComponent } from './dashboard-footer/dashboard-footer.component';
import { NotificationsPanelComponent } from './notifications-panel/notifications-panel.component';
import { DashboardAsideComponent } from './dashboard-aside/dashboard-aside.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { LockedComponent } from './locked/locked.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CustomCardComponent } from './custom-card/custom-card.component';

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
    DashboardHeaderComponent,
    LockedComponent,
    CustomInputComponent,
    CustomCardComponent,
  ],
  imports: [
    CommonModule,
    NgClass,
    MatProgressSpinnerModule,
    NgIf,
    RouterLink,
    MatIconModule,
    MatSlideToggleModule,
    RouterLinkActive,
    ReactiveFormsModule

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
    DashboardHeaderComponent,
    LockedComponent,
    CustomInputComponent,
    CustomCardComponent,
  ]
})

export class SharedModule{}
