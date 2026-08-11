import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../../utility/validators.directive';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';
import { AlertService } from '../../alert';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { defaultServerError } from '../../utility/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private route: Router,
    private alert: AlertService,
    private toast: ToastrService,
    private authService: SocialAuthService,
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.socialLogin(user);
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  login = this.fb.group({
    email: ['', [emailValidator()]],
    password: ['', Validators.required],
  });

  private navigateByUserType(user: { user_type: string }): void {
    const redirectUrl = localStorage.getItem('redirectUrl');
    if (redirectUrl) {
      this.route.navigateByUrl(JSON.parse(redirectUrl)).then(r => r);
      localStorage.removeItem('redirectUrl');
    } else if (user.user_type === 'startup') {
      this.route.navigateByUrl('startup/home').then(r => r);
    } else if (user.user_type === 'investor') {
      this.route.navigateByUrl('investor/home').then(r => r);
    } else if (user.user_type === 'admin') {
      this.route.navigateByUrl('admin/home').then(r => r);
    } else {
      this.route.navigateByUrl('company-incorporation').then(r => r);
    }
  }

  onSubmit() {
    if (this.login.valid) {
      this.isLoading = true;
      this.accountsService.login(this.login.value).subscribe({
        next: value => {
          this.toast.success(`Welcome ${value.user.name}`);
          this.isLoading = false;
          this.navigateByUserType(value.user);
        },
        error: err => {
          this.alert.error(err.error?.message || defaultServerError);
          this.isLoading = false;
        },
      });
    } else {
      this.login.markAllAsTouched();
    }
  }

  socialLogin(socialCredentials: SocialUser) {
    this.accountsService.socialLogin(socialCredentials).subscribe({
      next: value => {
        this.toast.success(`Welcome ${value.user.name}`);
        this.navigateByUserType(value.user);
      },
      error: err => {
        this.alert.error(err.error?.message || defaultServerError);
      },
    });
  }
}
