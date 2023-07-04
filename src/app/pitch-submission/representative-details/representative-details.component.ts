import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CurrencyPipe, PercentPipe} from "@angular/common";
import {PitchSubmissionService} from "../pitch-submission.service";
import {Router} from "@angular/router";
import {FormDataAppender} from "../../utility/formDataAppender";

@Component({
  selector: 'app-representative-details',
  templateUrl: './representative-details.component.html',
  styleUrls: ['./representative-details.component.css']
})
export class RepresentativeDetailsComponent {

  constructor(private fb: FormBuilder,
              private pitchService: PitchSubmissionService,
              private router: Router,
              private appender: FormDataAppender){
  }

  repDetailsForm = this.fb.nonNullable.group({
    repName: ['', [Validators.required]],
    position: ['', [Validators.required]],
    linkedIn: [''],
    repBio: ['', Validators.required]

  })
  onSubmit() {
    if(this.repDetailsForm.valid) {
      this.appender.appendFormData(this.repDetailsForm)
      this.pitchService.saveRepDetails(this.repDetailsForm.getRawValue())
      this.router.navigateByUrl('/pitch-submission/supporting-documents').then(r => r)
    }
  }
}
