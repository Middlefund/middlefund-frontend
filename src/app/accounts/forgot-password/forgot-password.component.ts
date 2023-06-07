import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AccountsService} from "../accounts.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert";
import {emailValidator} from "../../utility/validators.directive";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  isLoading: boolean = false

  constructor(private fb: FormBuilder,
              private accountsService: AccountsService,
              private route: Router,
              private alert: AlertService) {
  }

  forgotPassword = this.fb.group({
    email: ['', [emailValidator()]],
  })
  onSubmit() {
    this.isLoading = true;
    if(this.forgotPassword.valid) {
      this.accountsService.forgotPassword(this.forgotPassword.value).subscribe({
        next: value => {
          this.alert.success("An email has been to your account with instruction")
          this.isLoading = false;
        },
        error: err => {
          this.alert.error(err.error.message || "Oops! Server error")
          this.isLoading = false
        }
      })
    }
  }
}
