import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-business-description',
  templateUrl: './business-description.component.html',
  styleUrls: ['./business-description.component.css']
})
export class BusinessDescriptionComponent {

  constructor(private fb: FormBuilder) {
  }

  businessDescription = this.fb.group({
    businessType: ['', Validators.required],
    principalActivities: ['', Validators.required]
  })

  onSubmitBusinessDescription() {

  }
}
