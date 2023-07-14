import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InvestorService} from "../investor.service";
import {ToastrService} from "ngx-toastr";
import {startupData} from "../../models/interfaces";

@Component({
  selector: 'app-view-startup',
  templateUrl: './view-startup.component.html',
  styleUrls: ['./view-startup.component.css']
})
export class ViewStartupComponent implements OnInit {
  id: string = ''
  startup!: startupData
  loading: boolean = false
  constructor(private activateRoute: ActivatedRoute,
              private investorService: InvestorService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id']
    });

    this.getPitch()

  }

  getPitch() {
    this.loading = true
    this.investorService.getPitch(this.id).subscribe({
      next: value => {
        this.loading = false;
        this.startup = value.data
      },
      error: err => {
        this.loading = false;
        this.toast.error(err.error.error || "Server error")
      }
    })
  }
  rawAmount(input: string = '') {
    console.log(input)

    return Number(input?.split('.')[0]?.replace(/\D(?!\.)/g, ''))
  }

  formatCurrency(value: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  }


}



