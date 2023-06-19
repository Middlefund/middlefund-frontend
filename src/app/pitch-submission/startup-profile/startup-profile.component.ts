import {Component, OnInit} from '@angular/core';
import {PitchSubmissionService} from "../pitch-submission.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-startup-profile',
  templateUrl: './startup-profile.component.html',
  styleUrls: ['./startup-profile.component.css']
})
export class StartupProfileComponent implements OnInit{
  industries: Array<{name: string, value: string}> = []
  loadingIndustries: boolean = false
  registrationInfo: Array<{name: string, value: string}> = [
    {name: "Sole proprietorship", value: "Sole proprietorship"},
    {name: "Limited Liability Company (LLC)", value: "Limited Liability Company (LLC)"},
    {name: "S-Corp", value: "S-Corp"},
    {name: "C-Corp", value: "C-Corp"},
    {name: "Company Limited by Shares", value: "Company Limited by Shares"},
    {name: "Company Unlimited by Shares", value: "Company Unlimited by Shares"},
    {name: "Company Limited by Guarantee", value: "Company Limited by Guarantee"},
    {name: "Incorporated Partnership", value: "Incorporated Partnership"},
  ]
  stagesOptions: Array<{name: string, value: string}> = [
    {name: "Idea Stage", value: "Idea Stage"},
    {name: "Minimum Viable Product (MVP)", value: "Minimum Viable Product (MVP)"},
    {name: "Pre Seed(Pre Revenue)", value: "Pre Seed(Pre Revenue)"},
    {name: "Pre Seed(Pre Revenue with Traction)", value: "Pre Seed(Pre Revenue with Traction)"},
    {name: "Early Stage", value: "Early Stage"},
    {name: "Seed Stage", value: "Seed Stage"},
    {name: "Series A+", value: "Series A+"},
  ]

  constructor(private pitchService: PitchSubmissionService,
              private toast: ToastrService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getAllIndustries()
  }

  getAllIndustries() {
    this.loadingIndustries = true;
    this.pitchService.getIndustries().subscribe({
      next: value => {
       value.data.map((industry: {name: string}) => {
         this.industries.push({name: industry.name, value: industry.name})
       })
        this.loadingIndustries = false;
      },
      error: error => {
        this.loadingIndustries = false;
        this.toast.error(error.error.message || "Oops! Server error")
      }
    })
  }

  startupProfileForm = this.fb.group({
    startupName: ['', [Validators.required]],
    registrationInfo: [null],
    industry: [null, Validators.required],
    registrationCountry: [null],
    stage: [null, Validators.required],
    location: this.fb.group({
      country: [null, Validators.required],
      city: [null, Validators.required],
      region: [null, Validators.required],
    }),
    social: this.fb.group({
      website: ['',],
      linkedIn: ['']
    })

  })

  onSubmit = () => {
    console.log(this.startupProfileForm.value)
  }
}
