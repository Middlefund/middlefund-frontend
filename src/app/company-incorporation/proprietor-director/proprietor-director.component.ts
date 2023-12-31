import { Component, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';

@Component({
  selector: 'app-proprietor-director',
  templateUrl: './proprietor-director.component.html',
  styleUrls: ['./proprietor-director.component.css'],
})
export class ProprietorDirectorComponent implements OnInit {
  stage: number = 1;

  constructor(private incorporationService: CompanyIncorporationService) {}

  ngOnInit() {
    this.incorporationService.roleStage.subscribe(value => {
      this.stage = value;
    });
  }

  isRoleDetailsValid() {
    return this.incorporationService.roleDetailsForm.valid;
  }

  isRoleTinContactValid() {
    return this.incorporationService.roleTinContactForm.valid;
  }

  isRoleProofValid() {
    return this.incorporationService.roleProofForm.valid;
  }
}
