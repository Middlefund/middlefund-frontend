import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyIncorporationService } from '../company-incorporation.service';

@Component({
  selector: 'app-incorporation-form',
  templateUrl: './incorporation-form.component.html',
  styleUrls: ['./incorporation-form.component.css']
})
export class IncorporationFormComponent implements OnInit{
  incorporationForm!: FormGroup
  stage: number = 1
  constructor(private fb: FormBuilder,
              private incorporationService: CompanyIncorporationService) {
    this.incorporationForm = this.fb.group({
      companyName: ['', Validators.required],
      companyType: [null, Validators.required],
      registrationCountry: [null, Validators.required],
    })
  }

  ngOnInit() {
    this.incorporationService.stage.subscribe((value) => {
      this.stage = value
    })
  }
}
