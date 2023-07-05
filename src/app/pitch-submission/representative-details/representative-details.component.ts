import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CurrencyPipe, PercentPipe} from "@angular/common";
import {PitchSubmissionService} from "../pitch-submission.service";
import {Router} from "@angular/router";
import {FormDataAppender} from "../../utility/formDataAppender";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-representative-details',
  templateUrl: './representative-details.component.html',
  styleUrls: ['./representative-details.component.css']
})
export class RepresentativeDetailsComponent {
  isLoading: boolean = false;
  constructor(private fb: FormBuilder,
              private pitchService: PitchSubmissionService,
              private router: Router,
              private appender: FormDataAppender,
              private toast: ToastrService){
  }

  repDetailsForm = this.fb.nonNullable.group({
    repName: ['', [Validators.required]],
    position: ['', [Validators.required]],
    linkedIn: [''],
    repBio: ['', Validators.required]

  })
  onSubmit() {
    if(this.repDetailsForm.valid) {
      this.isLoading = true;
      this.appender.appendFormData(this.repDetailsForm)
      this.pitchService.saveRepDetails(this.repDetailsForm.getRawValue())
      this.pitchService.submitRepDetails(this.repDetailsForm.getRawValue()).subscribe({
        next: (value ) => {
          localStorage.setItem('pitch', JSON.stringify(value.data))
          this.pitchService.updatePitch(value.data)
          this.isLoading = false;
          this.router.navigateByUrl('/pitch-submission/supporting-documents').then(r => r)
          this.toast.success(value.message)
        },
        error: error => {
          this.toast.error(error.error.message || 'Oops! Something went wrong');
          this.isLoading = false
        }
      })

    }
  }
}
