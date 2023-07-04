import {NgModule} from "@angular/core";
import {PitchSubmissionComponent} from "./pitch-submission.component";
import { StartupProfileComponent } from './startup-profile/startup-profile.component';
import { PitchDetailsComponent } from './pitch-details/pitch-details.component';
import { RepresentativeDetailsComponent } from './representative-details/representative-details.component';
import { SupportingDocumentsComponent } from './supporting-documents/supporting-documents.component';
import { ReviewingPitchComponent } from './reviewing-pitch/reviewing-pitch.component';
import {RouterOutlet} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {CommonModule, CurrencyPipe, NgClass, NgIf, PercentPipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PitchSubmissionRoutingModule} from "./pitch-submission-routing.module";
import {FormDataAppender} from "../utility/formDataAppender";

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
    CommonModule,
    PitchSubmissionRoutingModule,
    SharedModule,
    NgClass,
    ReactiveFormsModule,
    NgIf,
    FormsModule
  ],
  exports: [],
  providers: [CurrencyPipe, PercentPipe, FormDataAppender]
})

export class PitchSubmissionModule {}
