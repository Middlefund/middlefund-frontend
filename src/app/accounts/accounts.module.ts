import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SignupComponent } from './signup/signup.component';
import {MatIconModule} from "@angular/material/icon";
import { InputComponent } from './shared/input/input.component';
import { PanelComponent } from './shared/panel/panel.component';
import { AccountsLayoutComponent } from './accounts-layout/accounts-layout.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    InputComponent,
    PanelComponent,
    AccountsLayoutComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MatIconModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class AccountsModule { }
