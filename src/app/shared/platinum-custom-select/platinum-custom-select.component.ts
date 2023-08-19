import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-platinum-custom-select',
  templateUrl: './platinum-custom-select.component.html',
  styleUrls: ['./platinum-custom-select.component.css']
})
export class PlatinumCustomSelectComponent {

  @Input() label: string = '';
  @Input() for: string = '';
  @Input() type: string = ''
  @Input() placeholder: string = ''
  @Input() options:{ name: string, value: any }[] = []
  @Input() control = new FormControl();
  @Input() loadingOptions = false;

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
