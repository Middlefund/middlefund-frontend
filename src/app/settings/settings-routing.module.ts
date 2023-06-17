import {SettingsComponent} from "./settings.component";
import {RouterModule, Routes} from "@angular/router";
import {PersonalInformationComponent} from "./personal-information/personal-information.component";
import {NgModule} from "@angular/core";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";
import {InvestorSettingsComponent} from "./investor-settings/investor-settings.component";

const routes: Routes = [
  { path: '', component: SettingsComponent, children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: PersonalInformationComponent},
      {path: 'accounts', component: AccountSettingsComponent},
      {path: 'investor-settings', component: InvestorSettingsComponent}
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SettingsRoutingModule {}
