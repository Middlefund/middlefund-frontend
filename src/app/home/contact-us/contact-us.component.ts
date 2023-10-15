import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { FormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../home.service';
import { IContactUs } from '../../utility/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactUs: AnimationOptions = {
    path: '../../../../assets/lottie/ContactUs.json',
  }
  isLoading: boolean = false

  constructor(private fb: FormBuilder,
              private homeService: HomeService,
              private toast: ToastrService) {
  }

  contactUsForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required]],
  })

  onSubmit() {
    this.isLoading = true;
    this.homeService.contactUs(this.contactUsForm.value as IContactUs).subscribe({
      next: value => {
        this.toast.success(value.message)
        this.isLoading = false;
        this.contactUsForm.reset()
      },
      error: err => {
        this.toast.error(err.error.message)
        this.isLoading = false;
      }
    })
  }
}
