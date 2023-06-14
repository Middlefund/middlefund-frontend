import {NgModule} from "@angular/core";
import {LogoComponent} from "./logo/logo.component";
import { ButtonComponent } from './button/button.component';
import {NgClass, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AlertComponent} from "../alert/alert.component";
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterLink} from "@angular/router";
import { FlipBoxComponent } from './flip-box/flip-box.component';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    LogoComponent,
    ButtonComponent,
    NotFoundComponent,
    FlipBoxComponent,
    StatsCardComponent,
    UnderConstructionComponent,
  ],
  imports: [
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
  ]
})

export class SharedModule{}
