import {NgModule} from "@angular/core";
import {LogoComponent} from "./logo/logo.component";
import { ButtonComponent } from './button/button.component';
import {NgClass, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    LogoComponent,
    ButtonComponent,
  ],
  imports: [
    NgClass,
    MatProgressSpinnerModule,
    NgIf

  ],
  exports: [
    LogoComponent,
    ButtonComponent,
  ]
})

export class SharedModule{}
