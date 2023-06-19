import {NgModule} from "@angular/core";
import {PitchSubmissionComponent} from "./pitch-submission.component";
import { StartupProfileComponent } from './startup-profile/startup-profile.component';
import { PitchDetailsComponent } from './pitch-details/pitch-details.component';
import { RepresentativeDetailsComponent } from './representative-details/representative-details.component';
import { SupportingDocumentsComponent } from './supporting-documents/supporting-documents.component';
import { ReviewingPitchComponent } from './reviewing-pitch/reviewing-pitch.component';
import {RouterOutlet} from "@angular/router";
import {PitchSubmissionRoutingModule} from "./pitch-submission-routing.module";
import {SharedModule} from "../shared/shared.module";
import {CurrencyPipe, NgClass} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PitchSubmissionComponent,
    StartupProfileComponent,
    PitchDetailsComponent,
    RepresentativeDetailsComponent,
    SupportingDocumentsComponent,
    ReviewingPitchComponent
  ],
  imports: [
    RouterOutlet,
    PitchSubmissionRoutingModule,
    SharedModule,
    NgClass,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [CurrencyPipe]
})

export class PitchSubmissionModule {}
