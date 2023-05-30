import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SignupComponent } from './signup/signup.component';
import {MatIconModule} from "@angular/material/icon";
import { InputComponent } from './shared/input/input.component';
import { PanelComponent } from './shared/panel/panel.component';
import { ButtonComponent } from './shared/button/button.component';
import { AccountsLayoutComponent } from './accounts-layout/accounts-layout.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    InputComponent,
    PanelComponent,
    ButtonComponent,
    AccountsLayoutComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MatIconModule
  ]
})
export class AccountsModule { }
