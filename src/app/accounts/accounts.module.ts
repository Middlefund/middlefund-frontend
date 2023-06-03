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


@NgModule({
  declarations: [
    LoginComponent,
    InputComponent,
    AccountsLayoutComponent,
    SignupComponent
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
