import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-supporting-documents',
  templateUrl: './supporting-documents.component.html',
  styleUrls: ['./supporting-documents.component.css']
})
export class SupportingDocumentsComponent {

  constructor(private fb: FormBuilder){
  }
  supportingDocsForm = this.fb.group({
    logo: ['', Validators.required],
    pitch: ['', Validators.required],
    video: [''],
    id: ['', Validators.required]
  })

  onSubmit() {

  }
}
