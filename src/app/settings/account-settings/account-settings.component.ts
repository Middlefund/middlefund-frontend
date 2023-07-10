import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SettingsService} from "../settings.service";
import {ToastrService} from "ngx-toastr";
import {AlertService} from "../../alert";
import {Router} from "@angular/router";
import {confirmPasswordValidator, passwordValidator} from "../../utility/validators.directive";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit{
  isLoading: boolean = false;
  password: any = '';
  constructor(private fb: FormBuilder,
              private settingsService: SettingsService,
              private toast: ToastrService,
              private alert: AlertService,
              private router: Router) {
  }

  ngOnInit() {
    this.changePasswordForm.controls.password.valueChanges.subscribe(value => {
      this.password = this.changePasswordForm.get('password_confirmation')?.setValidators(confirmPasswordValidator(value!))
      this.password = this.changePasswordForm.get('password_confirmation')?.updateValueAndValidity()
    })
  }

  changePasswordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    password: ['', passwordValidator()],
    password_confirmation: ['', confirmPasswordValidator(this.password)]
  })

  onSubmit() {
    if(this.changePasswordForm.valid) {
      this.isLoading = true
      this.settingsService.changePassword(this.changePasswordForm.value).subscribe({
        next: value => {
          this.toast.success(value.message)
          this.alert.success(value.message)
          this.isLoading = false
          localStorage.clear()
          this.router.navigateByUrl('/login').then(r => r)
        },
        error: err => {
          this.isLoading = false
          this.toast.error(err.error.message)
          this.alert.error(err.error.message)
        }
      })
    }
  }
}
