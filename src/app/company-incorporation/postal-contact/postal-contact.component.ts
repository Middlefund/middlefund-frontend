import { Component, inject } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';

@Component({
  selector: 'app-postal-contact',
  templateUrl: './postal-contact.component.html',
  styleUrls: ['./postal-contact.component.css']
})
export class PostalContactComponent {
  companyIncorporationForm = inject(CompanyIncorporationService).companyIncorporationForm
  postalTypes:Array<{name: string, value: string}> = [
    {name: 'P. O BOX', value: 'P. O BOX'},
  ]
  contactTypes:Array<{name: string, value: string}> = [
    {name: 'Email', value: 'Email'},
    {name: 'Phone', value: 'Phone'},
  ]

  constructor(private incorporationService: CompanyIncorporationService) {
  }
  onSubmit() {
    this.incorporationService.updateTinStage(5)
  }

  onPrevious() {
    this.incorporationService.updateTinStage(3)
  }
}
