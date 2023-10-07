import {RouterModule, Routes} from "@angular/router";
import {CompanyIncorporationComponent} from "./company-incorporation.component";
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  { path: '', component: CompanyIncorporationComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent}
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompanyIncorporationRoutingModule {}
