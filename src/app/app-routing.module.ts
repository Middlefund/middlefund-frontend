import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AccountsModule} from "./accounts/accounts.module";
import {StartupComponent} from "./dashboard/startup/startup.component";
import {InvestorComponent} from "./dashboard/investor/investor.component";
const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', loadChildren: accountsModule},
  {path: 'startup', component: StartupComponent},
  {path: 'investor', component: InvestorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
