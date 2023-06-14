import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TermsAndConditionsComponent} from "./terms-and-conditions/terms-and-conditions.component";
import {NotFoundComponent} from "./shared/not-found/not-found.component";
import {StartupDashboardComponent} from "./startup-dashboard/startup-dashboard.component";
import {InvestorDashboardComponent} from "./investor-dashboard/investor-dashboard.component";
import {UnderConstructionComponent} from "./shared/under-construction/under-construction.component";
const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);
const startupDashboardModule = () => import('./startup-dashboard/startup-dashboard.module').then(x => x.StartupDashboardModule)

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', loadChildren: accountsModule},
  {path: 'startup', loadChildren: startupDashboardModule},
  {path: 'investor', component: InvestorDashboardComponent},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'under-construction', component: UnderConstructionComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
