import {NgModule} from "@angular/core";
import {LogoComponent} from "./logo/logo.component";
import { ButtonComponent } from './button/button.component';
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
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
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomTextAreaComponent } from './custom-text-area/custom-text-area.component';
import { CustomFileInputComponent } from './custom-file-input/custom-file-input.component';
import {SafeUrlPipe} from "../utility/safeUrlPipe.pipe";
import {PdfViewerModule} from "ng2-pdf-viewer";
import player from 'lottie-web'
import { RocketAnimationComponent } from './rocket-animation/rocket-animation.component';
import {LottieComponent, LottieModule} from "ngx-lottie";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

export function playerFactory() {
  return player
}
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
    CustomSelectComponent,
    CustomTextAreaComponent,
    CustomFileInputComponent,
    SafeUrlPipe,
    RocketAnimationComponent,
    BreadcrumbComponent
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
        ReactiveFormsModule,
        PdfViewerModule,
        LottieModule.forRoot({player: playerFactory})
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
    CustomSelectComponent,
    CustomTextAreaComponent,
    CustomFileInputComponent,
    RocketAnimationComponent,
    BreadcrumbComponent,
  ]
})

export class SharedModule{}
