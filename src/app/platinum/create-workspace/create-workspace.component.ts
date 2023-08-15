import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

interface onInit {
}

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.css']
})
export class CreateWorkspaceComponent implements onInit {
  emails: string[] = [];
  error: string = ""
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

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
        this.error = 'Email is not correct'
      }
    }
  }

  onCreate() {
    if(this.emails.length) {

    }
    const data = {
      name: this.createWorkSpaceForm.controls.name.value,
      emails: this.emails
    }
  }

}
