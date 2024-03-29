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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomCardComponent } from './custom-card/custom-card.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomTextAreaComponent } from './custom-text-area/custom-text-area.component';
import { CustomFileInputComponent } from './custom-file-input/custom-file-input.component';
import {SafeUrlPipe} from "../utility/safeUrlPipe.pipe";
import {PdfViewerModule} from "ng2-pdf-viewer";
import player from 'lottie-web'
import { RocketAnimationComponent } from './rocket-animation/rocket-animation.component';
import {LottieModule} from "ngx-lottie";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CustomCardSkeletonComponent } from './custom-card/custom-card-skeleton/custom-card-skeleton.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import {DialogModule} from "primeng/dialog";
import { CustomMultiSelectComponent } from './custom-multi-select/custom-multi-select.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatMenuModule} from "@angular/material/menu";
import { PlatinumLogoComponent } from './platinum-logo/platinum-logo.component';
import { PlatinumAsideComponent } from './platinum-aside/platinum-aside.component';
import { PlatinumCustomInputComponent } from './platinum-custom-input/platinum-custom-input.component';
import { PlatinumCustomSelectComponent } from './platinum-custom-select/platinum-custom-select.component';
import { PlatinumCustomFileComponent } from './platinum-custom-file/platinum-custom-file.component';
import {FileInputComponent} from "./file-input/file-input.component";
import { MiddlefundLoaderComponent } from './middlefund-loader/middlefund-loader.component';


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
    BreadcrumbComponent,
    CustomCardSkeletonComponent,
    ConfirmationModalComponent,
    CustomMultiSelectComponent,
    CustomTableComponent,
    PlatinumLogoComponent,
    PlatinumAsideComponent,
    PlatinumCustomInputComponent,
    PlatinumCustomSelectComponent,
    PlatinumCustomFileComponent,
    FileInputComponent,
    MiddlefundLoaderComponent,
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
    LottieModule.forRoot({ player: playerFactory }),
    NgxSkeletonLoaderModule,
    DialogModule,
    FormsModule,
    NgxPaginationModule,
    MatMenuModule,
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
    CustomCardSkeletonComponent,
    ConfirmationModalComponent,
    CustomMultiSelectComponent,
    CustomTableComponent,
    PlatinumLogoComponent,
    PlatinumAsideComponent,
    PlatinumCustomInputComponent,
    PlatinumCustomSelectComponent,
    FileInputComponent,
    MiddlefundLoaderComponent,
  ],
})
export class SharedModule {}
