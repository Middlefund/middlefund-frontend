import { Component, inject, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { answer, industries } from '../../utility/constants';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../shared/location.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {
  companyIncorporationService = inject(CompanyIncorporationService)
  businessDetailsFrom = this.companyIncorporationService.tinBusinessDetailsForm
  location = inject(LocationService)

  constructor(private toast: ToastrService) {
  }

  ngOnInit() {
    this.businessDetailsFrom.controls.isRegistered.valueChanges.subscribe((value) => {
      if (value === 'yes') {
        this.toast.info('Please provide information about the registered business')
      }
    })
  }

  onSubmit = () => {

  }

  onPrevious = () => {

  }
  protected readonly industries = industries;
  protected readonly answer = answer;
  protected readonly String = String;
}
