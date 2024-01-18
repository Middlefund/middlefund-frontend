import { Component, OnInit } from '@angular/core';
import { capitalizeWords } from '../../utility/capitalizeEachWord';
import { IProprietorDirector } from '../../models/companyIncorporation.interface';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultServerError } from '../../utility/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-directors',
  templateUrl: './list-directors.component.html',
  styleUrls: ['./list-directors.component.css'],
})
export class ListDirectorsComponent implements OnInit {
  directors: IProprietorDirector[] = [];
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  id: string = this.activatedRoute.snapshot.paramMap.get('id') as string;
  status: string = 'incomplete';
  isDeleting: boolean = false;
  deleteId = '';

  constructor(
    private companyIncorporationService: CompanyIncorporationService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getDirectors();
  }

  getDirectors() {
    this.isLoading = true;
    this.companyIncorporationService
      .getDirectors(this.activatedRoute.snapshot.paramMap.get('id') as string)
      .subscribe({
        next: value => {
          this.directors = value.data;
          this.isLoading = false;
          this.status = value.status;
        },
        error: err => {
          this.isLoading = false;
          this.toast.error(err.error?.message || defaultServerError);
        },
      });
  }

  submit() {
    this.isSubmitting = true;
    this.companyIncorporationService
      .submitDirectors(
        this.activatedRoute.snapshot.paramMap.get('id') as string,
      )
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigateByUrl('../../home');
          this.status = 'awaiting review';
        },
        error: err => {
          this.isSubmitting = false;
          this.toast.error(err.error?.message || defaultServerError);
        },
      });
  }

  deleteDirector = () => {
    this.isDeleting = true;
    this.companyIncorporationService.deleteDirector(this.deleteId).subscribe({
      next: value => {
        this.isDeleting = false;
        this.toast.success(value.message);
        this.directors = this.directors.filter(
          director => director.id !== this.deleteId,
        );
        this.deleteId = '';
      },
      error: err => {
        this.isDeleting = false;
        this.toast.error(err.error?.message || defaultServerError);
      },
    });
  };
  protected readonly Boolean = Boolean;
}
