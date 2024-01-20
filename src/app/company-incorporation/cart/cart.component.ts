import { Component, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { Icart } from '../../models/companyIncorporation.interface';
import { ActivatedRoute } from '@angular/router';
import { defaultServerError } from '../../utility/constants';
import { ToastrService } from 'ngx-toastr';
import { capitalizeWords } from '../../utility/capitalizeEachWord';
import { AlertService } from '../../alert';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: Icart;
  isLoading = false;
  isSending: boolean = false;
  constructor(
    private companyIncorporationService: CompanyIncorporationService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private alert: AlertService,
    private _location: Location,
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
    this.isSending = true;
    this.companyIncorporationService
      .pay({
        amount: this.cart?.total,
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
          this.isSending = false;
          this.alert.error(err.error?.message || defaultServerError);
          this.toast.error(err.error?.message || defaultServerError);
        },
      });
  };

  backClicked() {
    this._location.back();
  }

  protected readonly capitalizeWords = capitalizeWords;
  protected readonly Boolean = Boolean;
}
