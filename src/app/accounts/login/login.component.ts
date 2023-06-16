import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {emailValidator} from "../../utility/validators.directive";
import {AccountsService} from "../accounts.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert";
import {SweetAlertsService} from "../../utility/sweetAlerts.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false
  showPassword: boolean = false

  constructor(private fb: FormBuilder,
              private accountsService: AccountsService,
              private route: Router,
              private alert: AlertService,
              private sweetAlert: SweetAlertsService) {
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  login = this.fb.group({
    email: ['', [emailValidator()]],
    password: ['', Validators.required]
  })


  onSubmit() {
    if(this.login.valid){
      this.isLoading = true
      this.accountsService.login(this.login.value).subscribe({
        next: value => {
          this.sweetAlert.toast("info", `Welcome ${value.user.name}`)
          if(value.user.user_type === "startup"){
            this.route.navigateByUrl('startup/home').then(r => r)
          }
          else{
            this.route.navigateByUrl('investor/home').then(r => r)
          }
          this.isLoading = false
        },
        error: err => {
          this.alert.error(err.error.message || "Oops! Server error")
          this.isLoading = false
        }
      })
    }else {
      this.login.markAllAsTouched()
    }
  }

  socialLogin() {
    this.accountsService.socialLogin().subscribe({
      next: value => {
        const width = 600;
        const height = 700;
        const left = (screen.width - width) / 2;
        const top = ( screen.height - height) / 2;
        window.open(value.url,"center window",'resizable=yes, width=' + width
          + ', height=' + height + ', top='
          + top + ', left=' + left)

      },
      error: err => {
        this.alert.error(err.error.message || "Oops! Server error")
      }
    })
  }
}
