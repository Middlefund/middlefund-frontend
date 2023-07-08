import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  isLoading: boolean = false;
  constructor(private fb: FormBuilder) {
  }

  changePasswordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required]
  })

  onSubmit() {

  }
}
