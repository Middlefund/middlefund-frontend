import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent {
  @Input() for:string = '';
  @Input() label:string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() control = new FormControl
  @Input() disabled: boolean = false;

  errorMessages: Record<string, string> = {
    required: "This field is required.",
    pattern: "You input is invalid.",
    email: "Provide a valid email",
    passwordMismatch: "Password must be a minimum of 8 characters, include uppercase, number and special character.",
    invalidEmail: "Please provide a valid email",
    invalidFullName: "Provide a name in this format: Firstname Lastname",
    invalidConfirmPassword: "Passwords do not match"
  }
}
