import { Component, inject, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { yesOrNo } from '../../utility/constants';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-proprietor-tin-contact',
  templateUrl: './proprietor-tin-contact.component.html',
  styleUrls: ['./proprietor-tin-contact.component.css'],
})
export class ProprietorTinContactComponent implements OnInit {
  tinContactForm = inject(CompanyIncorporationService).roleTinContactForm;

  constructor(
    private companyIncorporationService: CompanyIncorporationService,
  ) {}

  ngOnInit() {
    this.tinContactForm.controls.hasTin.valueChanges.subscribe(value => {
      if (value === 'yes') {
        this.tinContactForm.controls.tin.setValidators([Validators.required]);
        this.tinContactForm.controls.tin.updateValueAndValidity();
      } else {
        this.tinContactForm.controls.tin.setValidators([]);
        this.tinContactForm.controls.tin.updateValueAndValidity();
      }
    });
  }

  onSubmit() {
    this.companyIncorporationService.updateRoleStage(3);
  }

  protected readonly yesOrNo = yesOrNo;
}
