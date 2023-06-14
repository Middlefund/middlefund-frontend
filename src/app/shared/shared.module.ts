import {NgModule} from "@angular/core";
import {LogoComponent} from "./logo/logo.component";
import { ButtonComponent } from './button/button.component';
import {NgClass, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AlertComponent} from "../alert/alert.component";
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    LogoComponent,
    ButtonComponent,
    NotFoundComponent,
  ],
  imports: [
    NgClass,
    MatProgressSpinnerModule,
    NgIf,
    RouterLink

  ],
  exports: [
    LogoComponent,
    ButtonComponent,
  ]
})

export class SharedModule{}
