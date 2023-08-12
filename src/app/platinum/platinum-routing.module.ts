import {RouterModule, Routes} from "@angular/router";
import {PlatinumComponent} from "./platinum.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {CreateWorkspaceComponent} from "./create-workspace/create-workspace.component";

const routes: Routes = [
  {path: '', component: PlatinumComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'create-workspace', component: CreateWorkspaceComponent}

    ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PlatinumRoutingModule {}
