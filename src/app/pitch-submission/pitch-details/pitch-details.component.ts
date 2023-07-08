import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CurrencyPipe, PercentPipe} from "@angular/common";
import {PitchSubmissionService} from "../pitch-submission.service";
import {Router} from "@angular/router";
import {FormDataAppender} from "../../utility/formDataAppender";
import {ToastrService} from "ngx-toastr";
import {startupData} from "../../models/interfaces";

@Component({
  selector: 'app-pitch-details',
  templateUrl: './pitch-details.component.html',
  styleUrls: ['./pitch-details.component.css']
})
export class PitchDetailsComponent implements OnInit{
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
  isLoading: boolean = false
  isLoadingPage: boolean = false

  constructor(private fb: FormBuilder,
              private currencyPipe: CurrencyPipe,
              private percentagePipe: PercentPipe,
              private pitchService: PitchSubmissionService,
              private router: Router,
              private appender: FormDataAppender,
              private toast: ToastrService) {
  }
  ngOnInit() {
    this.getPitch()
  }

  pitchDetailsForm = this.fb.group({
    raisedAmount: [null, Validators.required],
    amountToRaise: ['', [Validators.required, Validators.pattern('^\\$[\\d,]+(\\.\\d{2})?$')]],
    purpose: [null, Validators.required],
    equity: ['', [Validators.required, Validators.pattern('\\b([0-9]|[1-9][0-9]|100)\\b')]],
    startupBio: ['', [Validators.required]]
  })

  setData(pitch: startupData) {
    this.pitchDetailsForm.get('raisedAmount')?.setValue(pitch.raised_amount)
    this.pitchDetailsForm.get('amountToRaise')?.setValue(pitch.amount_to_raise)
    this.pitchDetailsForm.get('purpose')?.setValue(pitch.purpose)
    this.pitchDetailsForm.get('equity')?.setValue(pitch.equity)
    this.pitchDetailsForm.get('startupBio')?.setValue(pitch.startup_bio)
  }

  getPitch() {
    if(this.pitchService.pitchData) {
      const pitch: startupData = this.pitchService.pitchData
      this.setData(pitch)
    }
    else {
      this.isLoadingPage = true
      this.pitchService.getPitch().subscribe({
        next: value => {
          localStorage.setItem('pitch', JSON.stringify(value.data))
          this.pitchService.updatePitch(value.data)
          this.setData(value.data)
          this.isLoadingPage = false;
        },
        error: error => {
          this.isLoadingPage = false;
          this.toast.error(error.error.message || "Oops! Server error")
        }
      })
    }
  }

  transformAmount() {
    this.pitchDetailsForm.get('amountToRaise')?.setValue(this.currencyPipe.transform(this.pitchDetailsForm.controls.amountToRaise.value, '$'))
  }

  transformPercentage() {
    this.pitchDetailsForm.get('equity')?.setValue(this.percentagePipe.transform((this.pitchDetailsForm.controls.equity.value ?? 0 / 100), '1.2-2'))
  }

  onSubmit = () => {
    if(this.pitchDetailsForm.valid) {
      // this.appender.appendFormData(this.pitchDetailsForm)
      // this.pitchService.savePitchDetails(this.pitchDetailsForm.getRawValue())
      this.isLoading = true
      this.pitchService.submitPitchDetails(this.pitchDetailsForm.getRawValue()).subscribe({
        next: value => {
          localStorage.setItem('pitch', JSON.stringify(value.data))
          this.pitchService.updatePitch(value.data)
          this.router.navigateByUrl('/pitch-submission/representative-details').then(r => r)
          this.toast.success(value.message)
          this.isLoading = false
        },
        error: error => {
          this.toast.error(error.error.message || 'Oops! Something went wrong');
          this.isLoading = false
        }
      })
    }
  }
}
