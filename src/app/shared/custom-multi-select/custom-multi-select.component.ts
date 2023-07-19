import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";

@Component({
  selector: 'app-custom-multi-select',
  templateUrl: './custom-multi-select.component.html',
  styleUrls: ['./custom-multi-select.component.css']
})
export class CustomMultiSelectComponent {
  @Input() arrayName = ''
  @Input() label: string = '';
  @Input() control = new FormControl()
  @Input() for: string = '';
  @Input() placeholder: string = ''
  @Input() options:{ name: string, value: any }[] = []
  @Output() optionSelected = new EventEmitter<any>();

  selectedOptions: string[] = []

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  toggleOption(option: any) {
    if (this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    } else {
      this.selectedOptions.push(option);
    }
    console.log(this.selectedOptions)
    this.optionSelected.emit(this.selectedOptions)
  }

  errorMessages: Record<string, string> = {
    required: "This field is required.",
    pattern: "You input is invalid.",
    email: "Provide a valid email",
    passwordMismatch: "Password must be a minimum of 8 characters, include uppercase, number and special character.",
    invalidEmail: "Please provide a valid email",
    invalidFullName: "Provide a name in this format: Firstname Lastname",
    invalidConfirmPassword: "Passwords do not match"
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const dropdown = !(event.target as HTMLElement).closest('.dropdown');
    const dropdownInput = !(event.target as HTMLElement).closest('.dropDownInput');
    if (dropdown && dropdownInput) {
      this.isDropdownOpen = false;
    }
  }
}
