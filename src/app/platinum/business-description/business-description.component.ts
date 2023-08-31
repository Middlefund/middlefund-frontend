import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PitchSubmissionService} from "../../pitch-submission/pitch-submission.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-business-description',
  templateUrl: './business-description.component.html',
  styleUrls: ['./business-description.component.css']
})
export class BusinessDescriptionComponent implements OnInit {
  loadingIndustries = false;
  industries: Array<{name: string, value: string}> = []

  constructor(private fb: FormBuilder,
              private pitchService: PitchSubmissionService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.getAllIndustries()
  }

  businessDescription = this.fb.group({
    businessType: ['', Validators.required],
    principalActivities: ['', Validators.required]
  })

  onSubmitBusinessDescription() {
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
