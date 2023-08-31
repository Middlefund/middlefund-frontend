import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TermsAndConditionsComponent} from "./terms-and-conditions/terms-and-conditions.component";
import {NotFoundComponent} from "./shared/not-found/not-found.component";
import {UnderConstructionComponent} from "./shared/under-construction/under-construction.component";
import {
  canActivate,
  canActivateAdmin,
  canActivateInvestor,
  canActivateStartup,
  cannotAuthenticate
} from "./utility/auth.guard";

const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);
const startupDashboardModule = () => import('./startup-dashboard/startup-dashboard.module').then(x => x.StartupDashboardModule)
const investorDashboardModule = () => import('./investor-dashboard/investor-dashboard.module').then(x => x.InvestorDashboardModule)
const pitchSubmissionModule = () => import('./pitch-submission/pitch-submission.module').then(x => x.PitchSubmissionModule)

const adminDashboardModule = () => import('./admin-dashboard/admin-dashboard.module').then(x => x.AdminDashboardModule)
const platinumModule = () => import('./platinum/platinum.module').then(x => x.PlatinumModule)

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', loadChildren: accountsModule, canActivate: [cannotAuthenticate]},
  {path: 'startup', loadChildren: startupDashboardModule, canActivate: [canActivateStartup]},
  {path: 'investor', loadChildren: investorDashboardModule, canActivate: [canActivateInvestor]},
  {path: 'pitch-submission', loadChildren: pitchSubmissionModule, canActivate: [canActivateStartup]},
  {path: 'admin', loadChildren: adminDashboardModule, canActivate: [canActivateAdmin]},
  {path: 'platinum', loadChildren: platinumModule, canActivate: [canActivate]},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'under-construction', component: UnderConstructionComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
