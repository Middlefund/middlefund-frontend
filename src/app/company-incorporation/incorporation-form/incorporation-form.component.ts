import { Component, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-incorporation-form',
  templateUrl: './incorporation-form.component.html',
  styleUrls: ['./incorporation-form.component.css'],
})
export class IncorporationFormComponent implements OnInit {
  stage: number = 1;
  constructor(
    private incorporationService: CompanyIncorporationService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.incorporationService.companyStage.subscribe(value => {
      this.stage = value;
    });

    // this.incorporationService.companyIncorporationForm.valueChanges.subscribe(
    //   () => {
    //     localStorage.setItem(
    //       'companyIncorporation',
    //       JSON.stringify(
    //         this.incorporationService.companyIncorporationForm.value,
    //       ),
    //     );
    //   },
    // );
  }

  isBusinessProfileValid() {
    return this.incorporationService.businessProfileForm.valid;
  }

  isBusinessAddressValid() {
    return this.incorporationService.businessAddress.valid;
  }
}
