import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PitchSubmissionService} from "../pitch-submission.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {pitchData} from "../../models/interfaces";
import {FormDataAppender} from "../../utility/formDataAppender";
import {AlertService} from "../../alert";


@Component({
  selector: 'app-supporting-documents',
  templateUrl: './supporting-documents.component.html',
  styleUrls: ['./supporting-documents.component.css']
})
export class SupportingDocumentsComponent implements OnInit{

  isLoading = false;
  pitchFormData: FormData = new FormData();
  isLoadingPage: boolean = false;
  logoSrc: string = '';
  videoSrc: string = '';
  idSrc: string = '';
  pdfSrc: string = '';
  isConfirmationModal: boolean = false;
  constructor(private fb: FormBuilder,
              private pitchService: PitchSubmissionService,
              private toast: ToastrService,
              private append: FormDataAppender,
              private router: Router,
              private alerts: AlertService){
  }

  ngOnInit() {
    this.getPitch()
  }

  supportingDocsForm = this.fb.group({
    logo: ['', Validators.required],
    pitch: ['', Validators.required],
    video: [''],
    repId: ['', Validators.required]
  })

  setData(pitch: pitchData) {
    this.logoSrc = pitch.logo
    this.idSrc = pitch.repId
    this.videoSrc = pitch.video
    this.pdfSrc = pitch.pitch
    this.supportingDocsForm.get('logo')?.setValue(pitch.logo)
    this.pitchFormData.set('logo', pitch.logo)
    this.supportingDocsForm.get('pitch')?.setValue(pitch.pitch)
    this.pitchFormData.set('pitch', pitch.pitch)
    this.supportingDocsForm.get('repId')?.setValue(pitch.repId)
    this.pitchFormData.set('repId', pitch.repId)
    this.supportingDocsForm.get('video')?.setValue(pitch.video)
    this.pitchFormData.append('video', pitch.video)
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
          // this.setData(value.data)
          this.isLoadingPage = false;
        },
        error: error => {
          this.isLoadingPage = false;
          this.toast.error(error.error.message || "Oops! Server error")
        }
      })
    }
  }

  onLogoChange(event: any) {
    const file = event.target.files[0];
    if(file.size > 1000000) {
      this.alerts.error("Logo upload size should be less than 1MB")
    } else {
      this.pitchFormData.append('logo', file)
      this.supportingDocsForm.patchValue({ logo: file });
      this.pitchService.pitchFormData.set('logo', file)
      // Check if the file is an image
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.logoSrc = e.target.result
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }

  }

  onPitchChange(event: any) {
    const file = event.target.files[0];
    if(file.size > 1500000) {
      this.alerts.error('Pitch deck upload size should be less than 1.5MB')
    } else {
      this.pitchFormData.append('pitch', file)
      this.supportingDocsForm.patchValue({ pitch: file });
      this.pitchService.pitchFormData.set('pitch', file)
      // Check if the file is an image
      if (file && file.type.startsWith('application/pdf')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.pdfSrc = e.target.result
        };
        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }

  }

  onVideoChange(event: any) {
    const file = event.target.files[0]
    if(file.size > 5000000) {
      this.alerts.error("Video pitch upload size should be less than 5MB")
    } else {
      this.supportingDocsForm.patchValue({ video: file})
      this.pitchFormData.append('video', file)
      this.pitchService.pitchFormData.set('video', file)
      // Check if the file is an image
      if (file && file.type.startsWith('video/')) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.videoSrc = e.target.result
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }

  }

  onIdChange(event: any) {
    const file = event.target.files[0];
    if(file.size > 1000000) {
      this.alerts.error("Id upload size should be less than 1MB")
    } else {
      this.supportingDocsForm.patchValue({ repId: file})
      this.pitchFormData.append('repId', file, file)
      this.pitchService.pitchFormData.set('repId', file)
      // Check if the file is an image
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.idSrc = e.target.result
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }
  }

  toggleConfirmationModal() {
    this.isConfirmationModal = !this.isConfirmationModal
  }

  onSubmit() {
    if (this.supportingDocsForm.value) {
      // Assuming you have a FormData object called 'formData'

// Iterate over the fields of the formData object
      this.pitchService.pitchFormData.forEach((value, key) => {
        console.log(key, value);
      });

      // if(JSON.stringify(this.pitchService.supportingDocs) === JSON.stringify(this.supportingDocsForm.value)) {
      //   this.router.navigateByUrl('/startup/home').then(r => r)
      // } else {
        this.isLoading = true
        this.pitchService.submitPitch().subscribe({
          next: (value: any) => {
            localStorage.setItem('pitch', JSON.stringify(value.data))
            this.pitchService.setData(value.data)
            this.pitchService.updatePitch()
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
