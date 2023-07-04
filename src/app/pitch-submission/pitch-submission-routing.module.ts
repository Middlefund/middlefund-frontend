import {RouterModule, Routes} from "@angular/router";
import {PitchSubmissionComponent} from "./pitch-submission.component";
import {StartupProfileComponent} from "./startup-profile/startup-profile.component";
import {PitchDetailsComponent} from "./pitch-details/pitch-details.component";
import {RepresentativeDetailsComponent} from "./representative-details/representative-details.component";
import {SupportingDocumentsComponent} from "./supporting-documents/supporting-documents.component";
import {NgModule} from "@angular/core";
import {ReviewingPitchComponent} from "./reviewing-pitch/reviewing-pitch.component";
import {canActivatePitchDetails} from "../utility/auth.guard"

const routes: Routes = [
  {path: '', component: PitchSubmissionComponent, children: [
      {path: '', redirectTo: 'startup-profile', pathMatch: 'full' },
      {path: 'startup-profile', component: StartupProfileComponent},
      {path: 'pitch-details', component: PitchDetailsComponent, canActivate: [canActivatePitchDetails]},
      {path: 'representative-details', component: RepresentativeDetailsComponent},
      {path: 'supporting-documents',component: SupportingDocumentsComponent},
      {path: 'reviewing-pitch', component: ReviewingPitchComponent }
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PitchSubmissionRoutingModule {}
