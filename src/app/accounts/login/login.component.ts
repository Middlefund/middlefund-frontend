import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {emailValidator} from "../../utility/validators.directive";
import {AccountsService} from "../accounts.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert";
import {ToastrService} from "ngx-toastr";

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
              private toast: ToastrService) {
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
          this.toast.success(`Welcome ${value.user.name}`)
          console.log(this.accountsService.redirectUrl)
          this.isLoading = false
          if (this.accountsService.redirectUrl) {
            console.log(this.accountsService.redirectUrl)
            return this.route.navigateByUrl(this.accountsService.redirectUrl).then(r => r)
          }
          if(value.user.user_type === "startup"){
            return this.route.navigateByUrl('startup/home').then(r => r)
          }
          else{
            return this.route.navigateByUrl('investor/home').then(r => r)
          }
        },
        error: err => {
          this.alert.error(err.error?.message || "Oops! Server error")
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
