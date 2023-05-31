import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {emailValidator} from "../../utility/validators.directive";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false

  constructor(private fb: FormBuilder) {
  }

  login = this.fb.group({
    email: ['', [emailValidator()]],
    password: ['']
  })
}
