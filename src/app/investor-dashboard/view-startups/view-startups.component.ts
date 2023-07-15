import {Component, OnInit} from '@angular/core';
import {InvestorService} from "../investor.service";
import {startupData} from "../../models/interfaces";
import {PitchSubmissionService} from "../../pitch-submission/pitch-submission.service";
import {ToastrService} from "ngx-toastr";
import {registrationInfo} from "../../utility/constants";
import {FormBuilder} from "@angular/forms";

// interface PageEvent {
//   first: number;
//   rows: number;
//   page: number;
//   pageCount: number;
// }

@Component({
  selector: 'app-view-startups',
  templateUrl: './view-startups.component.html',
  styleUrls: ['./view-startups.component.css']
})
export class ViewStartupsComponent implements OnInit{
  isLoading: boolean = false
  first: number = 0;
  rows: number = 10;
  filter: string = ''
  search: string = ''
  page: number = 1
  perPage: number = 10
  startups: Array<startupData> = []
  industries: Array<{name: string, value: string}> = []
  loadingIndustries = false
  total: any

  constructor(private investorService: InvestorService,
              private pitch: PitchSubmissionService,
              private toast: ToastrService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getPitches()
    this.getAllIndustries()
    // this.searchFilter.valueChanges.subscribe(
    //   this.getPitches()
    // )

    this.searchFilter.valueChanges.subscribe(() =>{
      this.getPitches()
    })
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  searchFilter = this.fb.group({
    search: [''],
    filter: [null]
  })

  getPitches() {
    this.isLoading = true
    this.investorService.getAllPitches(this.page, this.perPage, this.searchFilter.controls.filter.value || '', this.searchFilter.controls.search.value! || '').subscribe({
      next: value => {
        this.isLoading = false
        this.startups = []
        this.total = value.data.total
        console.log(this.total)
        value.data.data.map((startup: startupData) => {
          this.startups.push(startup)
        })
      },
      error: err => {
        this.isLoading = false
      }
    })
  }

  getAllIndustries() {
    this.loadingIndustries = true;
    this.pitch.getIndustries().subscribe({
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

  pageChange(event: any) {
    console.log(event)
  }

  protected readonly registrationInfo = registrationInfo;
}
