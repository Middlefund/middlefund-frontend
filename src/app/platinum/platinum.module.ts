import {NgModule} from "@angular/core";
import {PlatinumRoutingModule} from "./platinum-routing.module";
import {PlatinumComponent} from "./platinum.component";
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    PlatinumComponent,
    HomeComponent
  ],
  imports: [
    PlatinumRoutingModule,
    SharedModule,
    MatIconModule
  ],
  exports: []
})

export class PlatinumModule {}
