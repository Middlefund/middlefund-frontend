import {RouterModule, Routes} from "@angular/router";
import {CompanyIncorporationComponent} from "./company-incorporation.component";
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";
import { IncorporationFormComponent } from './incorporation-form/incorporation-form.component';
import { TinRegistrationComponent } from './tin-registration/tin-registration.component';

const routes: Routes = [
  { path: '', component: CompanyIncorporationComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { path: 'incorporation-form', component: IncorporationFormComponent},
      { path: 'tin-registration', component: TinRegistrationComponent}
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompanyIncorporationRoutingModule {}
