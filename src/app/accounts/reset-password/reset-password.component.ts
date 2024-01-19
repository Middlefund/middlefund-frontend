import { Component } from '@angular/core';
import {
  confirmPasswordValidator,
  passwordValidator,
} from '../../utility/validators.directive';
import { FormBuilder } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../alert';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  isLoading: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  password: any = '';
  token: string = '';
  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private alert: AlertService,
    private toast: ToastrService,
  ) {}

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmShowPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  resetPassword = this.fb.group({
    password: ['', passwordValidator()],
    password_confirmation: ['', confirmPasswordValidator(this.password)],
  });

  passwordChanges = this.resetPassword.controls.password.valueChanges.subscribe(
    value => {
      this.password = this.resetPassword
        .get('password_confirmation')
        ?.setValidators(confirmPasswordValidator(value!));
      this.password = this.resetPassword
        .get('password_confirmation')
        ?.updateValueAndValidity();
    },
  );
  onSubmit() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
    });
    this.accountsService
      .resetPassword({ ...this.resetPassword.value, ...{ token: this.token } })
      .subscribe({
        next: value => {
          this.toast.success(value.message);
          this.route
            .navigate(['/login'])
            .then(r => console.log('Error navigating'));
          this.isLoading = false;
        },
        error: err => {
          this.alert.error(err.error.message);
          this.isLoading = false;
        },
      });
  }
}
