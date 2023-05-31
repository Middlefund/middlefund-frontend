import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  {path: '', children: [
      {path: 'login', component: LoginComponent},
      // {path: 'signup', component: SignupComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
