import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {PitchSubmissionService} from "../../pitch-submission/pitch-submission.service";
import {InvestorFormControls} from "../../utility/models";
import {registerAs, registrationInfo, stagesOptions} from "../../utility/constants";

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
  selectedInterests: string[] = []
  isOrganization: boolean = true
  constructor(private fb: FormBuilder,
              private toast: ToastrService,
              private pitchService: PitchSubmissionService) {}

  ngOnInit() {
    this.getAllIndustries()
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
    commitment: ['', Validators.required],
    minChequeSize: ['', Validators.required],
    maxChequeSize: ['', Validators.required],
    linkedIn: [''],
    twitter: [''],
  })

  onSubmit() {
    console.log(this.investorForm.value)
  }

  // onOptionSelect(event: any) {
  //   this.investorForm.controls.interests.setValue(event.join(', '))
  // }
  onOptionSelect(controlName: keyof InvestorFormControls, value: any) {
    this.investorForm.controls[controlName].setValue(value.join(', '));
  }



  addInterest(option: any) {
    // this.investorForm.controls.interests.push(option)
    console.log(this.investorForm.controls.interests.value)
    // if (index > -1) {
    //   this.selectedOptions.splice(option, 1);
    // } else {
    //   this.selectedOptions.push(option);
    // }
    // console.log(this.selectedOptions)
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

  protected readonly stagesOptions = stagesOptions;
  protected readonly registrationInfo = registrationInfo;
  protected readonly registerAs = registerAs;
}
