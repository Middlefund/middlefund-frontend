import {NgModule} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import {SettingsRoutingModule} from "./settings-routing.module";
import {SettingsComponent} from "./settings.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { InvestorSettingsComponent } from './investor-settings/investor-settings.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "../alert";
import {MultiSelectModule} from "primeng/multiselect";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    SettingsComponent,
    PersonalInformationComponent,
    AccountSettingsComponent,
    InvestorSettingsComponent
  ],
  imports: [
    RouterOutlet,
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    MultiSelectModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports : []
})

export class SettingsModule {}
