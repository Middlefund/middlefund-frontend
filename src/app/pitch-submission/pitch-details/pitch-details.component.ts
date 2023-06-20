import {Component, ElementRef} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CurrencyPipe, PercentPipe} from "@angular/common";

@Component({
  selector: 'app-pitch-details',
  templateUrl: './pitch-details.component.html',
  styleUrls: ['./pitch-details.component.css']
})
export class PitchDetailsComponent {
  raisedAmountOptions: Array<{name: string, value: string}> = [
    {name: 'No money raised', value: 'No money raised'},
    {name: 'Less than $50k', value: 'Less than $50k'},
    {name: 'Between $50k - $350k', value: 'Between $50k - $350k'},
    {name: 'Between $350k - $1M', value: 'Between $350k - $1M'},
    {name: 'More than $1M', value: 'More than $1M'},
  ]

  purposeOptions: Array<{name: string, value: string}> = [
    {name: 'Research and Development', value: 'Research and Development'},
    {name: 'Marketing', value: 'Marketing'},
    {name: 'Scaling', value: 'Scaling'},
    {name: 'Launch', value: 'Launch'},
    {name: 'New Product', value: 'New Product'},
    {name: 'Debts', value: 'Debts'},
    {name: 'Others', value: 'Others'},
  ]

  formattedAmount: any

  constructor(private fb: FormBuilder,
              private currencyPipe: CurrencyPipe,
              private percentagePipe: PercentPipe) {
  }

  pitchDetailsForm = this.fb.group({
    raisedAmount: [null, Validators.required],
    amountToRaise: ['', [Validators.required, Validators.pattern('^\\$[\\d,]+(\\.\\d{2})?$')]],
    purpose: [null, Validators.required],
    equity: ['', [Validators.required, Validators.pattern('\\b([0-9]|[1-9][0-9]|100)\\b')]],
    startupBio: ['', [Validators.required]]
  })


  transformAmount() {
    this.pitchDetailsForm.get('amountToRaise')?.setValue(this.currencyPipe.transform(this.pitchDetailsForm.controls.amountToRaise.value, '$'))
  }

  transformPercentage() {
    this.pitchDetailsForm.get('equity')?.setValue(this.percentagePipe.transform((this.pitchDetailsForm.controls.equity.value ?? 0 / 100), '1.2-2'))
  }

  onSubmit = () => {

  }
}
