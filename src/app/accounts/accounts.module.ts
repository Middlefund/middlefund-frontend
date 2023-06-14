import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import {MatIconModule} from "@angular/material/icon";
import { InputComponent } from './shared/input/input.component';
import { AccountsLayoutComponent } from './accounts-layout/accounts-layout.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AccountsService} from "./accounts.service";
import {HttpClientModule} from "@angular/common/http";
import {AlertModule} from "../alert";
import { SignupComponent } from './signup/signup.component';
import { VerificationSuccessComponent } from './verification-success/verification-success.component';
import { VerificationFailedComponent } from './verification-failed/verification-failed.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    InputComponent,
    AccountsLayoutComponent,
    SignupComponent,
    VerificationSuccessComponent,
    VerificationFailedComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MatIconModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule
  ],
  providers: [
    AccountsService,
  ]
})
export class AccountsModule { }
