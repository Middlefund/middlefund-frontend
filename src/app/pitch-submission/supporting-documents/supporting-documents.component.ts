import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PitchSubmissionService} from "../pitch-submission.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {startupData} from "../../models/interfaces";


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
              private router: Router,
              private sanitizer: DomSanitizer,
              ){
  }

  ngOnInit() {
    this.getPitch()
  }

  supportingDocsForm = this.fb.group({
    logo: [null, Validators.required],
    pitch: ['', Validators.required],
    video: [''],
    id: ['', Validators.required]
  })

  setData(pitch: startupData) {
    this.pitchService.getFileLink(pitch.logo).subscribe((blob: Blob) => {
      const file: any = new File([blob], 'logo.jpg', { type: 'image/*'})
      this.pitchFormData.append('logo', file)
      this.supportingDocsForm.patchValue({ logo: file });
    })
    this.logoSrc = pitch.logo
    this.pitchService.getFileLink(pitch.pitch_deck).subscribe((blob: Blob) => {
      const file: any = new File([blob], 'pitch.pdf', { type: 'application/pdf'})
      this.pitchFormData.append('pitch', file)
      this.supportingDocsForm.patchValue({ pitch: file });
    })
    this.pdfSrc = pitch.pitch_deck
    this.videoSrc = pitch.video_pitch
    this.pitchService.getFileLink(pitch.video_pitch).subscribe((blob: Blob) => {
      const file: any = new File([blob], 'pitch-video.pdf', { type: 'video/*'})
      this.pitchFormData.append('pitch', file)
      this.supportingDocsForm.patchValue({ video: file})
    })
    this.idSrc = pitch.rep_id;
    this.pitchService.getFileLink(pitch.rep_id).subscribe((blob: Blob) => {
      const file: any = new File([blob], 'rep-id.jpg', { type: 'image/*'})
      this.supportingDocsForm.patchValue({ id: file})
      this.pitchFormData.append('id', file)
    })
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
    // Check if the file is an image
    if (file && file.type.startsWith('video/')) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Sanitize the image URL
        // this.logoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result) as string;
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
    // Check if the file is an image
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Sanitize the image URL
        // this.logoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result) as string;
        this.idSrc = e.target.result
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.supportingDocsForm.value) {
      this.isLoading = true
      this.pitchService.submitSupportingDocs(this.pitchFormData).subscribe({
        next: (value: any) => {
          localStorage.setItem('pitch', JSON.stringify(value.data))
          this.pitchService.updatePitch(value.data)
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
