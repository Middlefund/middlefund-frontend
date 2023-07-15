import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PitchSubmissionService} from "../pitch-submission.service";
import {Router} from "@angular/router";
import {FormDataAppender} from "../../utility/formDataAppender";
import {ToastrService} from "ngx-toastr";
import {pitchData, startupData} from "../../models/interfaces";

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
    rep_linkedIn: [''],
    repBio: ['', Validators.required]

  })

  setData(pitch: pitchData) {
    this.repDetailsForm.get('repName')?.setValue(pitch.repName)
    this.repDetailsForm.get('position')?.setValue(pitch.position)
    this.repDetailsForm.get('rep_linkedIn')?.setValue(pitch.rep_linkedIn)
    this.repDetailsForm.get('repBio')?.setValue(pitch.repBio)
  }

  getPitch() {
    if(this.pitchService.pitchData) {
      const pitch: pitchData = this.pitchService.pitchData
      this.setData(pitch)
    } else {
      this.isLoadingPage = true
      this.pitchService.getPitch().subscribe({
        next: value => {
          localStorage.setItem('pitch', JSON.stringify(value.data))
          this.pitchService.updatePitch()
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
        this.appender.appendFormData(this.repDetailsForm)
        this.pitchService.updatePitch()
      // if(JSON.stringify(this.pitchService.repDetails) === JSON.stringify(this.repDetailsForm.value)) {
        this.router.navigateByUrl('/pitch-submission/supporting-documents').then(r => r)
      // }
      // else {
      //   this.isLoading = true;
      //   this.pitchService.submitRepDetails(this.repDetailsForm.getRawValue()).subscribe({
      //     next: (value ) => {
      //       localStorage.setItem('pitch', JSON.stringify(value.data))
      //       this.pitchService.updatePitch(value.data)
      //       this.isLoading = false;
      //       this.router.navigateByUrl('/pitch-submission/supporting-documents').then(r => r)
      //       this.toast.success(value.message)
      //     },
      //     error: error => {
      //       this.toast.error(error.error.message || 'Oops! Something went wrong');
      //       this.isLoading = false
      //     }
      //   })
      // }
    }
  }
}
