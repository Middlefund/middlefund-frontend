import {Component, OnInit} from '@angular/core';
import {PitchSubmissionService} from "../pitch-submission.service";
import {ToastrService} from "ngx-toastr";

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

  constructor(private pitchService: PitchSubmissionService,
              private toast: ToastrService) {
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
}
