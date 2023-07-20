import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {PitchSubmissionService} from "../../pitch-submission/pitch-submission.service";
import {InvestorFormControls, InvestorSettings} from "../../utility/models";
import {registerAs, registrationInfo, stagesOptions} from "../../utility/constants";
import {InvestorService} from "../../investor-dashboard/investor.service";
import {CurrencyPipe} from "@angular/common";
import {AlertService} from "../../alert";

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-investor-settings',
  templateUrl: './investor-settings.component.html',
  styleUrls: ['./investor-settings.component.css']
})
export class InvestorSettingsComponent implements OnInit{
  isLoading: boolean = false;
  interests: Array<{name: string, value: string}> = [];
  loadingIndustries = false;
  isOrganization: boolean = true
  isLoadingPage: boolean = false;
  investorSettings!: InvestorSettings

  constructor(private fb: FormBuilder,
              private toast: ToastrService,
              private pitchService: PitchSubmissionService,
              private investorService: InvestorService,
              private currencyPipe: CurrencyPipe,
              private alert: AlertService) {}

  ngOnInit() {
    this.getAllIndustries()
    this.getInvestorSettings()
    this.investorForm.controls.registerAs.valueChanges.subscribe((value: any) => {
      value === 'Organization' ? this.isOrganization = true : this.isOrganization = false;
    })
  }

  investorForm = this.fb.group({
    registerAs: ['Organization', Validators.required],
    organizationName: ['', this.isOrganization ? Validators.required : ''],
    investmentStage: ['', Validators.required],
    position: ['', this.isOrganization ? Validators.required : ''],
    interests: ['', Validators.required],
    commitment: ['', [Validators.required,  Validators.pattern('^\\$[\\d,]+(\\.\\d{2})?$')]],
    minChequeSize: ['', [Validators.required,  Validators.pattern('^\\$[\\d,]+(\\.\\d{2})?$')]],
    maxChequeSize: ['', [Validators.required,  Validators.pattern('^\\$[\\d,]+(\\.\\d{2})?$')]],
    linkedIn: [''],
    twitter: [''],
  })

  onSubmit() {
    if(this.investorForm.valid) {
      this.isLoading = true
      this.investorService.saveInvestorSettings(this.investorForm.value).subscribe({
        next: (value) => {
          this.alert.success(value.message)
          this.toast.success(value.message)
          this.isLoading = false
        },
        error: err => {
          this.toast.success(err.error.message || "Oops! Server error")
          this.alert.error(err.error.message || "Oops! Server error")
          this.isLoading = false
        }
      })
    }
  }

  onOptionSelect(controlName: keyof InvestorFormControls, value: any) {
    this.investorForm.controls[controlName].setValue(value.join(', '));
  }

  transformAmount(controlName: keyof InvestorFormControls) {
    this.investorForm.controls[controlName]?.setValue(this.currencyPipe.transform(this.investorForm.controls[controlName].value, '$'))
  }

  getAllIndustries() {
    this.loadingIndustries = true;
    this.pitchService.getIndustries().subscribe({
      next: value => {
        value.data.map((industry: {name: string}) => {
          this.interests.push({name: industry.name, value: industry.name})
        })
        this.loadingIndustries = false;
      },
      error: error => {
        this.loadingIndustries = false;
        this.toast.error(error.error.message || "Oops! Server error")
      }
    })
  }

  getInvestorSettings() {
    this.isLoadingPage = true;
    this.investorService.getInvestor().subscribe({
      next: value => {
        this.investorSettings = value.data
        this.setData(value.data)
        this.isLoadingPage = false;
      },
      error: error => {
        this.isLoadingPage = false;
        this.toast.error(error.error.message || "Oops! Server error")
        this.alert.error(error.error.message || "Oops! Server error")
      }
    })
  }

  setData(data: InvestorSettings) {
    this.investorForm.controls.registerAs.setValue(data.user_type)
    this.investorForm.controls.organizationName.setValue(data.organization_name)
    this.investorForm.controls.position.setValue(data.position)
    this.investorForm.controls.commitment.setValue(data.commitment)
    this.investorForm.controls.twitter.setValue(data.twitter)
    this.investorForm.controls.minChequeSize.setValue(data.min_cheque_size)
    this.investorForm.controls.maxChequeSize.setValue(data.max_cheque_size)
    this.investorForm.controls.linkedIn.setValue(data.linkedIn)
  }

  protected readonly stagesOptions = stagesOptions;
  protected readonly registrationInfo = registrationInfo;
  protected readonly registerAs = registerAs;
}
