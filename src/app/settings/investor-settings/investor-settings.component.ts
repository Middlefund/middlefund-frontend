import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {PitchSubmissionService} from "../../pitch-submission/pitch-submission.service";
import {InvestorFormControls, InvestorSettings} from "../../utility/models";
import {registerAs, registrationInfo, stagesOptions} from "../../utility/constants";
import {InvestorService} from "../../investor-dashboard/investor.service";
import {CurrencyPipe} from "@angular/common";
import {AlertService} from "../../alert";

@Component({
  selector: 'app-investor-settings',
  templateUrl: './investor-settings.component.html',
  styleUrls: ['./investor-settings.component.css']
})
export class InvestorSettingsComponent implements OnInit{
  isLoading: boolean = false;
  interests: Array<{name: string, value: string, checked: boolean}> = [];
  stages: Array<{name: string, value: string, checked: boolean}> = [
    {name: "Idea Stage", value: "Idea Stage", checked: false},
    {name: "Minimum Viable Product (MVP)", value: "Minimum Viable Product (MVP)", checked: false},
    {name: "Pre Seed(Pre Revenue)", value: "Pre Seed(Pre Revenue)", checked: false},
    {name: "Pre Seed(Pre Revenue with Traction)", value: "Pre Seed(Pre Revenue with Traction)", checked: false},
    {name: "Early Stage", value: "Early Stage", checked: false},
    {name: "Seed Stage", value: "Seed Stage", checked: false},
    {name: "Series A+", value: "Series A+", checked: false},
  ];

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
    this.getInvestorSettings()
    this.investorForm.controls.registerAs.valueChanges.subscribe((value: any) => {
      this.isOrganization = value === 'Organization';
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
    console.log(this.investorForm?.controls[controlName]?.value)
    let selectedOptions = this.investorForm?.controls[controlName]?.value === '' ?
      [] :
      this.investorForm?.controls[controlName]?.value?.split(', ')
    if(selectedOptions?.includes(value)) {
      selectedOptions = selectedOptions?.filter(item => item !== value);
      if(controlName === 'interests') {
        this.interests.forEach((interest) => {
          if (interest === value) {
            interest.checked = false;
          }
        });
      } else if (controlName === 'investmentStage') {
        this.stages.forEach((stage) => {
          if (stage.name === value) {
            stage.checked = false;
          }
        });
      }
    } else {
      selectedOptions?.push(value);
      if(controlName === 'interests') {
        this.interests.forEach((interest) => {
          if (interest === value) {
            interest.checked = true;
          }
        });
      } else if (controlName === 'investmentStage') {
        this.stages.forEach((stage) => {
          if (stage.name === value) {
            stage.checked = true;
          }
        });
      }
    }
    if(selectedOptions?.length === 1) {
      this.investorForm.controls[controlName].setValue(selectedOptions[0]);
    } else if(selectedOptions?.length){
      this.investorForm.controls[controlName].setValue(selectedOptions?.join(', ')!);
    } else {
      this.investorForm.controls[controlName].setValue('');
    }

  }

  transformAmount(controlName: keyof InvestorFormControls) {
    this.investorForm.controls[controlName]?.setValue(this.currencyPipe.transform(this.investorForm.controls[controlName].value, '$'))
  }

  getAllIndustries() {
    this.loadingIndustries = true;
    this.pitchService.getIndustries().subscribe({
      next: value => {
        value.data.map((industry: {name: string}) => {
          const interests = this.investorSettings.interests.split(', ')
          this.investorForm.controls.interests.setValue(this.investorSettings.interests)
          if(industry.name) {
            let checked: boolean = false;
            if(interests.includes(industry.name)) {
              checked = true
            }
            this.interests.push({name: industry.name, value: industry.name, checked: checked})
          }
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
        this.getAllIndustries()
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
    const stages = this.investorSettings.investment_stage.split(', ')
    this.stages.forEach((stage) => {
      if (stages.includes(stage.name)) {
        stage.checked = true;
      }
    });
    this.investorForm.controls.investmentStage.setValue(data.investment_stage)
  }
  protected readonly registrationInfo = registrationInfo;
  protected readonly registerAs = registerAs;
}
