import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PitchSubmissionService} from "../pitch-submission.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {startupData} from "../../models/interfaces";
import {FormDataAppender} from "../../utility/formDataAppender";


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
  constructor(private fb: FormBuilder,
              private pitchService: PitchSubmissionService,
              private toast: ToastrService,
              private append: FormDataAppender,
              private router: Router){
  }

  ngOnInit() {
    this.getPitch()
  }

  supportingDocsForm = this.fb.group({
    logo: ['', Validators.required],
    pitch: ['', Validators.required],
    video: [''],
    id: ['', Validators.required]
  })

  setData(pitch: startupData) {
    this.logoSrc = pitch.logo
    this.idSrc = pitch.rep_id
    this.videoSrc = pitch.video_pitch
    this.pdfSrc = pitch.pitch_deck
    this.supportingDocsForm.get('logo')?.setValue(pitch.logo)
    this.pitchFormData.append('logo', pitch.logo)
    this.supportingDocsForm.get('pitch')?.setValue(pitch.pitch_deck)
    this.pitchFormData.append('pitch', pitch.pitch_deck)
    this.supportingDocsForm.get('id')?.setValue(pitch.rep_id)
    this.pitchFormData.append('id', pitch.rep_id)
    this.supportingDocsForm.get('video')?.setValue(pitch.video_pitch)
    this.pitchFormData.append('video', pitch.video_pitch)
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

  onLogoChange(event: any) {
    const file = event.target.files[0];
    this.pitchFormData.append('logo', file)
    this.supportingDocsForm.patchValue({ logo: file });
    this.pitchService.pitchFormData.append('logo', file)
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

  onPitchChange(event: any) {
    const file = event.target.files[0];
    this.pitchFormData.append('pitch', file)
    this.supportingDocsForm.patchValue({ pitch: file });
    this.pitchService.pitchFormData.append('pitch', file)
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

  onVideoChange(event: any) {
    const file = event.target.files[0]
    this.supportingDocsForm.patchValue({ video: file})
    this.pitchFormData.append('video', file)
    this.pitchService.pitchFormData.append('video', file)
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

  onIdChange(event: any) {
    const file = event.target.files[0];
    this.supportingDocsForm.patchValue({ id: file})
    this.pitchFormData.append('id', file, file)
    this.pitchService.pitchFormData.append('id', file)
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
      //   this.isLoading = true
      //   this.pitchService.submitSupportingDocs(this.pitchFormData).subscribe({
      //     next: (value: any) => {
      //       localStorage.setItem('pitch', JSON.stringify(value.data))
      //       this.pitchService.updatePitch(value.data)
      //       this.toast.success(value.message)
      //       this.isLoading = false
      //       this.router.navigateByUrl('/startup/home').then(r => r)
      //     },
      //     error: (err: any) => {
      //       this.isLoading = false;
      //       this.toast.error(err.error.error || "Oops! Server error: ")
      //     }
      //   })
      // }
    }
  }

}
