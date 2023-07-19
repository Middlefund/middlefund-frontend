import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {PitchSubmissionService} from "../../pitch-submission/pitch-submission.service";
import {InvestorFormControls} from "../../utility/models";

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
  constructor(private fb: FormBuilder,
              private toast: ToastrService,
              private pitchService: PitchSubmissionService) {}

  ngOnInit() {
    this.getAllIndustries()
  }

  investorForm = this.fb.group({
    organizationName: [''],
    investmentStage: [''],
    position: [],
    interests: [this.selectedInterests.join(', ')],
    commitment: [''],
    minChequeSize: [''],
    maxChequeSize: [''],
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
}
