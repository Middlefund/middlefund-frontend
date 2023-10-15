import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {emailValidator} from "../../utility/validators.directive";
import {AccountsService} from "../accounts.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert";
import {ToastrService} from "ngx-toastr";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLoading: boolean = false
  showPassword: boolean = false

  constructor(private fb: FormBuilder,
              private accountsService: AccountsService,
              private route: Router,
              private alert: AlertService,
              private toast: ToastrService,
              private authService: SocialAuthService) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.socialLogin(user)
    })
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
          if (localStorage.getItem('redirectUrl')) {
            this.route.navigateByUrl(JSON.parse(localStorage.getItem('redirectUrl')!)).then(r => r)
          } else {
            this.route.navigateByUrl('company-incorporation').then(r => r)
          }
          // } else if (value.user.user_type === "startup"){
          //   this.route.navigateByUrl('startup/home').then(r => r)
          // } else if(value.user.user_type === "investor"){
          //   this.route.navigateByUrl('investor/home').then(r => r)
          // }
          // else if(value.user.user_type === "admin") {
          //   this.route.navigateByUrl('admin/home').then(r => r)
          // }
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

  socialLogin(socialCredentials: any) {
    this.accountsService.socialLogin(socialCredentials).subscribe({
      next: value => {
        console.log(value)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  // socialLogin() {
  //   this.accountsService.socialLogin().subscribe({
  //     next: value => {
  //       const width = 600;
  //       const height = 700;
  //       const left = (screen.width - width) / 2;
  //       const top = ( screen.height - height) / 2;
  //       const popup = window.open(value.url,"center window",'resizable=yes, width=' + width
  //         + ', height=' + height + ', top='
  //         + top + ', left=' + left)
  //
  //       const checkPopup = setInterval(() => {
  //         if (popup?.window.location.href.includes('localhost:4000')) {
  //           this.route.navigateByUrl(window.location.href)
  //           popup.close()
  //         }
  //         if (!popup || !popup.closed) {
  //           console.log('Yes')
  //           return
  //         }
  //         clearInterval(checkPopup);
  //       }, 1000);
  //     },
  //     error: err => {
  //       this.alert.error(err.error.message || "Oops! Server error")
  //     }
  //   })
  // }


}
