import { Component, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { Icart } from '../../models/companyIncorporation.interface';
import { ActivatedRoute } from '@angular/router';
import { defaultServerError } from '../../utility/constants';
import { ToastrService } from 'ngx-toastr';
import { capitalizeWords } from '../../utility/capitalizeEachWord';
import { AlertService } from '../../alert';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: Icart;
  isLoading = false;
  error: string = '';
  constructor(
    private companyIncorporationService: CompanyIncorporationService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private alert: AlertService,
  ) {}

  ngOnInit() {
    this.getCompanyCart();
  }

  getCompanyCart() {
    this.isLoading = true;
    this.companyIncorporationService
      .getCompanyCart(<string>this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe({
        next: value => {
          this.cart = value.data;
          this.isLoading = false;
        },
        error: err => {
          console.log(err.error.message);
          this.alert.error(err.error?.message || defaultServerError);
          this.toast.error(err.error?.message || defaultServerError);
          this.isLoading = false;
        },
      });
  }

  protected readonly capitalizeWords = capitalizeWords;
}
