import { Component } from '@angular/core';
import {
  confirmPasswordValidator,
  emailValidator,
  fullNameValidator,
  passwordValidator
} from "../../utility/validators.directive";
import {FormBuilder, Validators} from "@angular/forms";
import {AccountsService} from "../accounts.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert";
import {SweetAlertsService} from "../../utility/sweetAlerts.service";
import {capitalizeWords} from "../../utility/capitalizeEachWord";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading: boolean = false
  showPassword: boolean = false
  showConfirmPassword: boolean = false
  password: any = '';

  constructor(private fb: FormBuilder,
              private accountsService: AccountsService,
              private route: Router,
              private alert: AlertService,
              private sweetAlert: SweetAlertsService,
              private toast: ToastrService) {
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmShowPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  signup = this.fb.group({
    name: ['', [fullNameValidator()]],
    email: ['', [emailValidator()]],
    password: ['', passwordValidator()],
    confirmPassword: ['', confirmPasswordValidator(this.password)],
    userType: ['', Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  })

  passwordChanges = this.signup.controls.password.valueChanges.subscribe(value => {
    this.password = this.signup.get('confirmPassword')?.setValidators(confirmPasswordValidator(value!))
    this.password = this.signup.get('confirmPassword')?.updateValueAndValidity()
  })

  capitalizeFullName = this.signup.controls.name.valueChanges.subscribe(value => {
    if(value) {
      const capitalizedValue = capitalizeWords(value!);
      this.signup.controls.name.patchValue(capitalizedValue, {emitEvent: false});
    }
  })

  onSubmit() {
    if(this.signup.valid) {
      this.isLoading = true
      this.accountsService.register(this.signup.value).subscribe({
        next: value => {
          this.alert.success(value.message)
          this.toast.success(value.message)
          this.isLoading = false
          this.signup.reset()
        },
        error: err => {
          this.alert.error(err.error[0].email || "Oops! Server error")
          this.isLoading = false
        },
        complete: () => {
          this.isLoading = false
        }
      })
    }

  }
}
