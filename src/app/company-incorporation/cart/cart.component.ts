import { Component, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { Icart } from '../../models/companyIncorporation.interface';
import { ActivatedRoute } from '@angular/router';
import { defaultServerError } from '../../utility/constants';
import { ToastrService } from 'ngx-toastr';
import { capitalizeWords } from '../../utility/capitalizeEachWord';
import { AlertService } from '../../alert';
import { environments } from 'eslint-plugin-prettier';
import { environment } from '../../../environments/environment';

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
          this.alert.error(err.error?.message || defaultServerError);
          this.toast.error(err.error?.message || defaultServerError);
          this.isLoading = false;
        },
      });
  }

  pay = () => {
    this.companyIncorporationService
      .pay({
        amount: this.cart.total,
        callbackUrl: 'http://example.com',
        cancellationUrl: 'http://example.com',
        returnUrl: 'http://example.com',
        clientReference: 'Middlefund',
        description: 'Payment of company registration',
        logo: environment.MIDDLEFUND_LOGO,
        title: 'Middlefund',
      })
      .subscribe({
        next: value => {
          window.location.href = value.data.paylinkUrl;
        },
        error: err => {
          this.alert.error(err.error?.message || defaultServerError);
          this.toast.error(err.error?.message || defaultServerError);
        },
      });
  };

  protected readonly capitalizeWords = capitalizeWords;
}
