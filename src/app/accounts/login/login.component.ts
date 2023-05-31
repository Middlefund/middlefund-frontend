import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {emailValidator} from "../../utility/validators.directive";
import {AccountsService} from "../accounts.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false

  constructor(private fb: FormBuilder,
              private accountsService: AccountsService) {
  }

  login = this.fb.group({
    email: ['', [emailValidator()]],
    password: ['']
  })


  onSubmit() {
    if(this.login.valid){
      this.accountsService.login(this.login.value)
    }else {
      this.login.markAllAsTouched()
    }
  }
}
