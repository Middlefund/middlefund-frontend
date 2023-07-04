import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PitchSubmissionService} from "../pitch-submission.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-supporting-documents',
  templateUrl: './supporting-documents.component.html',
  styleUrls: ['./supporting-documents.component.css']
})
export class SupportingDocumentsComponent {

  isLoading = false;
  constructor(private fb: FormBuilder,
              private pitchService: PitchSubmissionService,
              private toast: ToastrService,
              private router: Router){
  }
  supportingDocsForm = this.fb.group({
    logo: [null, Validators.required],
    pitch: ['', Validators.required],
    video: [''],
    id: ['', Validators.required]
  })

  onLogoChange(event: any) {
    const file = event.target.files[0];
    this.supportingDocsForm.patchValue({ logo: file });
    this.pitchService.pitchFormData.append('logo', file)
  }

  onPitchChange(event: any) {
    const file = event.target.files[0];
    this.supportingDocsForm.patchValue({ pitch: file });
    this.pitchService.pitchFormData.append('pitch', file)
  }

  onVideoChange(event: any) {
    const file = event.target.files[0]
    this.supportingDocsForm.patchValue({ video: file})
    this.pitchService.pitchFormData.append('video', file, file)
  }

  onIdChange(event: any) {
    const file = event.target.files[0];
    this.supportingDocsForm.patchValue({ id: file})
    this.pitchService.pitchFormData.append('id', file, file)
  }

  onSubmit() {
    if (this.supportingDocsForm.value) {
      this.isLoading = true
      this.pitchService.submitPitch().subscribe({
        next: (value: any) => {
          this.toast.success(value.message)
            this.isLoading = false
          this.router.navigateByUrl('/startup/home').then(r => r)
        },
        error: (err: any) => {
          this.isLoading = false;
          this.toast.error(err.error.error || "Oops! Server error: ")
        }
      })
    }
  }
}
