import { Component, OnInit } from '@angular/core';
import { capitalizeWords } from '../../utility/capitalizeEachWord';
import { IProprietorDirector } from '../../models/companyIncorporation.interface';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { ActivatedRoute } from '@angular/router';
import { defaultServerError } from '../../utility/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-directors',
  templateUrl: './list-directors.component.html',
  styleUrls: ['./list-directors.component.css'],
})
export class ListDirectorsComponent implements OnInit {
  protected readonly capitalizeWords = capitalizeWords;
  directors: IProprietorDirector[] = [];
  isLoading: boolean = false;
  id: string = this.activatedRoute.snapshot.paramMap.get('id') as string;

  constructor(
    private companyIncorporationService: CompanyIncorporationService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
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
        },
        error: err => {
          this.isLoading = false;
          this.toast.error(err.error?.message || defaultServerError);
        },
      });
  }
}
