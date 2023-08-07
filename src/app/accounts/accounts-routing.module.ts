import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {VerificationSuccessComponent} from "./verification-success/verification-success.component";
import {VerificationFailedComponent} from "./verification-failed/verification-failed.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {OauthComponent} from "./oauth/oauth.component";


const routes: Routes = [
  {path: '', children: [
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'verification-success', component: VerificationSuccessComponent},
      {path: 'verification-failed', component: VerificationFailedComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password/:token', component: ResetPasswordComponent},
      {path: 'oauth/:type/:code', component: OauthComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
