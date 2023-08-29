import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PlatinumService} from "../platinum.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.css']
})
export class CreateWorkspaceComponent {
  emails: string[] = [];
  error: string = ""
  isLoading: boolean = false
  visible: boolean = false
  constructor(private fb: FormBuilder,
              private platinumService: PlatinumService,
              private toast: ToastrService,
              private router: Router) {
  }

  removeEmail(mail: string) {
    this.emails = this.emails.filter(email => email !== mail)
  }

  createWorkSpaceForm = this.fb.group({
    name: ['', Validators.required],
    email: ['']
  })

  addEmail(event: any) {
    if (event.key === 'Enter') {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
      if (regex.test(this.createWorkSpaceForm.controls.email.value!)) {
        if (!this.emails.includes(this.createWorkSpaceForm.controls.email.value!)) {
          this.emails.push(this.createWorkSpaceForm.controls.email.value!)
          this.createWorkSpaceForm.controls.email.reset()
          this.error = ''
        } else {
          this.error = 'Email already entered'
        }
      } else {
        this.error = 'Email is not a valid email'
      }
    }
  }

  createConfirmation() {
    if(this.emails.length) {
      this.onCreate()
    } else {
      this.visible = true
    }
  }

  onCreate() {
    this.isLoading = true;
    const data = {
      name: this.createWorkSpaceForm.controls.name.value ?? '',
      emails: this.emails
    }

    this.platinumService.createWorkspace(data).subscribe({
      next: value => {
        this.toast.success(value.message)
        this.router.navigateByUrl('/platinum/dashboard').then(r => r)
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
        this.toast.error(error.error.message)
      }
    })

  }

}
