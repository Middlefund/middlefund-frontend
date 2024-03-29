import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";
import {PitchSubmissionService} from "../pitch-submission.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {pitchData, startupData} from "../../models/interfaces";
import {purposeOptions, raisedAmountOptions} from "../../utility/constants";
import {FormDataAppender} from "../../utility/formDataAppender";

@Component({
  selector: 'app-pitch-details',
  templateUrl: './pitch-details.component.html',
  styleUrls: ['./pitch-details.component.css']
})
export class PitchDetailsComponent implements OnInit{
  formattedAmount: any
  isLoading: boolean = false
  isLoadingPage: boolean = false

  constructor(private fb: FormBuilder,
              private currencyPipe: CurrencyPipe,
              private pitchService: PitchSubmissionService,
              private router: Router,
              private toast: ToastrService,
              private append: FormDataAppender) {
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

  setData(pitch: pitchData) {
    this.pitchDetailsForm.get('raisedAmount')?.setValue(pitch.raisedAmount)
    this.pitchDetailsForm.get('amountToRaise')?.setValue(pitch.amountToRaise)
    this.pitchDetailsForm.get('purpose')?.setValue(pitch.purpose)
    this.pitchDetailsForm.get('equity')?.setValue(pitch.equity)
    this.pitchDetailsForm.get('startupBio')?.setValue(pitch.startupBio)
  }

  getPitch() {
    if(this.pitchService.pitchData) {
      const pitch: pitchData = this.pitchService.pitchData
      this.setData(pitch)
    }
    else {
      this.isLoadingPage = true
      this.pitchService.getPitch().subscribe({
        next: value => {
          localStorage.setItem('pitch', JSON.stringify(value.data))
          this.pitchService.updatePitch()
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

  onSubmit = () => {
    if(this.pitchDetailsForm.valid) {
        this.append.appendFormData(this.pitchDetailsForm)
        this.pitchService.updatePitch()
    //   if(JSON.stringify(this.pitchService.pitchDetails) === JSON.stringify(this.pitchDetailsForm.value)) {
        this.router.navigateByUrl('/pitch-submission/representative-details').then(r => r)
      // }
      // else {
      //   this.isLoading = true
      //   this.pitchService.submitPitchDetails(this.pitchDetailsForm.getRawValue()).subscribe({
      //     next: value => {
      //       localStorage.setItem('pitch', JSON.stringify(value.data))
      //       this.pitchService.updatePitch(value.data)
      //       this.router.navigateByUrl('/pitch-submission/representative-details').then(r => r)
      //       this.toast.success(value.message)
      //       this.isLoading = false
      //     },
      //     error: error => {
      //       this.toast.error(error.error.message || 'Oops! Something went wrong');
      //       this.isLoading = false
      //     }
      //   })
      // }
    }
  }
  protected readonly raisedAmountOptions = raisedAmountOptions;
  protected readonly purposeOptions = purposeOptions;
}
