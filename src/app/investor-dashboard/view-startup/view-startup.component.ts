import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InvestorService} from "../investor.service";
import {ToastrService} from "ngx-toastr";
import {startupData} from "../../models/interfaces";
import {AccountsService} from "../../accounts/accounts.service";

@Component({
  selector: 'app-view-startup',
  templateUrl: './view-startup.component.html',
  styleUrls: ['./view-startup.component.css']
})
export class ViewStartupComponent implements OnInit {
  id: string = ''
  startup!: startupData
  loading: boolean = false
  isLoading: boolean = false
  visible: boolean = false
  constructor(private activateRoute: ActivatedRoute,
              private investorService: InvestorService,
              private toast: ToastrService,
              private accountService: AccountsService,
              private router: Router
              ) {
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

  toggleModal() {
    this.visible = !this.visible
  }

  submit() {
    this.isLoading = true;
    this.investorService.interested(this.id).subscribe({
      next: value => {
        this.toast.success(value.message)
        this.router.navigateByUrl(`investor/interested/${this.id}`).then(r => r)
        this.isLoading = false
      },
      error: (err) => {
        this.toast.error(err.error.error || err.error.message || 'Oops! Server error')
        this.isLoading = false
      }
    })
  }

}



