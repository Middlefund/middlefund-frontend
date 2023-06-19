import {Component, ElementRef} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

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

  formattedAmount: any

  constructor(private fb: FormBuilder,
              private currencyPipe: CurrencyPipe) {
  }

  pitchDetailsForm = this.fb.group({
    raisedAmount: [null, Validators.required],
    amountToRaise: ['', Validators.required],
  })

  transformAmount() {
    alert("Hello")
    this.pitchDetailsForm.get('amountToRaise')?.setValue(this.currencyPipe.transform(this.pitchDetailsForm.controls.amountToRaise.value, '$'))
  }

  onSubmit = () => {

  }
}
