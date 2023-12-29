import {Component, inject} from '@angular/core';
import {CompanyIncorporationService} from "../company-incorporation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tin-contact',
  templateUrl: './tin-contact.component.html',
  styleUrls: ['./tin-contact.component.css']
})
export class TinContactComponent {
  tinContactForm = inject(CompanyIncorporationService).tinContactForm
  postalTypes: Array<{name: string, value: string}> = [
    {name: 'Home', value: 'home'},
    {name: 'Work', value: 'work'},
    {name: 'Other', value: 'other'}
  ]

  contactMethods: Array<{name: string, value: string}> = [
    {name: 'Email', value: 'email'},
    {name: 'Phone', value: 'phone'},
  ]

  constructor(private incorporationService: CompanyIncorporationService,) {
  }

  onSubmit() {
    this.incorporationService.updateTinStage(5)
  }

  onPrevious() {
    this.incorporationService.updateTinStage(3)
  }
}
