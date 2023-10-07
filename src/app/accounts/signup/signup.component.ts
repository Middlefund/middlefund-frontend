import {Component, OnInit} from '@angular/core';
import {
  confirmPasswordValidator,
  emailValidator,
  fullNameValidator,
  passwordValidator
} from "../../utility/validators.directive";
import {FormBuilder, Validators} from "@angular/forms";
import {AccountsService} from "../accounts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../alert";
import {capitalizeWords} from "../../utility/capitalizeEachWord";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false
  showPassword: boolean = false
  showConfirmPassword: boolean = false
  password: any = '';
  token: string = ''
  disabled: boolean = false

  constructor(private fb: FormBuilder,
              private accountsService: AccountsService,
              private router: Router,
              private alert: AlertService,
              private toast: ToastrService,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.setToken()
    this.signup.controls.password.valueChanges.subscribe(value => {
      this.password = this.signup.get('confirmPassword')?.setValidators(confirmPasswordValidator(value!))
      this.password = this.signup.get('confirmPassword')?.updateValueAndValidity()
    })

    this.signup.controls.name.valueChanges.subscribe(value => {
      if(value) {
        const capitalizedValue = capitalizeWords(value);
        this.signup.controls.name.patchValue(capitalizedValue, {emitEvent: false});
      }
    })
  }

  private setToken() {
    this.route.params.subscribe(params => {
      this.token = params['token']
      if(this.token) {
        this.disabled = true;
        this.toast.info('You do not have an account with us, please create one')
        this.signup.controls.token.setValue(this.token)
      }
    })
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmShowPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  signup = this.fb.group({
    name: ['', [fullNameValidator()]],
    email: [{value: '', disabled: this.disabled}, [emailValidator()]],
    password: ['', passwordValidator()],
    confirmPassword: ['', confirmPasswordValidator(this.password)],
    userType: ['', Validators.required],
    acceptTerms: [false, Validators.requiredTrue],
    token: ['']
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
          this.isLoading = false
          this.alert.error(err.error[0].email || "Oops! Server error")
        },
        complete: () => {
          this.isLoading = false
        }
      })
    }

  }
}
