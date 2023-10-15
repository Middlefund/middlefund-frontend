import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyIncorporationService } from '../company-incorporation.service';

@Component({
  selector: 'app-incorporation-form',
  templateUrl: './incorporation-form.component.html',
  styleUrls: ['./incorporation-form.component.css']
})
export class IncorporationFormComponent implements OnInit{
  stage: number = 1
  constructor(private fb: FormBuilder,
              private incorporationService: CompanyIncorporationService) {
  }

  ngOnInit() {
    this.incorporationService.stage.subscribe((value) => {
      this.stage = value
    })

    this.incorporationService.companyIncorporationForm.valueChanges.subscribe(() => {
      localStorage.setItem('companyIncorporation', JSON.stringify(this.incorporationService.companyIncorporationForm.value))
    })
  }

  isBusinessProfileValid () {
    return this.incorporationService.businessProfileForm.valid
  }
}
