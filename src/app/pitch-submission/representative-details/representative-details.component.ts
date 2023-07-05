import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CurrencyPipe, PercentPipe} from "@angular/common";
import {PitchSubmissionService} from "../pitch-submission.service";
import {Router} from "@angular/router";
import {FormDataAppender} from "../../utility/formDataAppender";
import {ToastrService} from "ngx-toastr";
import {startupData} from "../../models/interfaces";

@Component({
  selector: 'app-representative-details',
  templateUrl: './representative-details.component.html',
  styleUrls: ['./representative-details.component.css']
})
export class RepresentativeDetailsComponent implements OnInit{
  isLoading: boolean = false;
  isLoadingPage: boolean = false;
  constructor(private fb: FormBuilder,
              private pitchService: PitchSubmissionService,
              private router: Router,
              private appender: FormDataAppender,
              private toast: ToastrService){
  }

  ngOnInit() {
    this.getPitch()
  }

  repDetailsForm = this.fb.nonNullable.group({
    repName: ['', [Validators.required]],
    position: ['', [Validators.required]],
    linkedIn: [''],
    repBio: ['', Validators.required]

  })

  setData(pitch: startupData) {
    this.repDetailsForm.get('repName')?.setValue(pitch.rep_name)
    this.repDetailsForm.get('position')?.setValue(pitch.rep_position)
    this.repDetailsForm.get('linkedIn')?.setValue(pitch.rep_linkedin)
    this.repDetailsForm.get('repBio')?.setValue(pitch.rep_short_bio)
  }

  getPitch() {
    if(this.pitchService.pitchData) {
      const pitch: startupData = this.pitchService.pitchData
      this.setData(pitch)
    } else {
      this.isLoadingPage = true
      this.pitchService.getPitch().subscribe({
        next: value => {
          localStorage.setItem('pitch', JSON.stringify(value.data))
          this.pitchService.updatePitch(value.data)
          this.setData(value.data)
          this.isLoadingPage = false;
        },
        error: error => {
          this.isLoadingPage = false;
          this.toast.error(error.error.message || "Oops! Server error")
        }
      })
    }
  }
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
