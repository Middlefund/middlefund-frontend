import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultServerError } from '../../utility/constants';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-proprietor-director',
  templateUrl: './proprietor-director.component.html',
  styleUrls: ['./proprietor-director.component.css'],
})
export class ProprietorDirectorComponent implements OnInit, OnDestroy {
  stage: number = 1;
  isLoading = false;
  status: string = 'incomplete';
  isDirector = this.router.url.startsWith('/company-incorporation/director/');

  constructor(
    private incorporationService: CompanyIncorporationService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.router.url.startsWith('/company-incorporation/director/')) {
      this.getDirector();
    } else {
      this.getProprietor();
    }
    this.incorporationService.roleStage.subscribe(value => {
      this.stage = value;
    });
    this.incorporationService.roleTinContactForm.controls.hasTin.valueChanges.subscribe(
      value => {
        if (value === 'yes') {
          this.incorporationService.roleTinContactForm.controls.tin.setValidators(
            [Validators.required],
          );
          this.incorporationService.roleTinContactForm.controls.tin.updateValueAndValidity();
        } else {
          this.incorporationService.roleTinContactForm.controls.tin.setValidators(
            [],
          );
          this.incorporationService.roleTinContactForm.controls.tin.updateValueAndValidity();
        }
      },
    );
  }

  ngOnDestroy() {
    console.log('ngOnDestroy as directors');
    this.incorporationService.roleDetailsForm.reset();
    this.incorporationService.roleProofForm.reset();
    this.incorporationService.roleTinContactForm.reset();
  }

  isRoleDetailsValid() {
    return this.incorporationService.roleDetailsForm.valid;
  }

  isRoleTinContactValid() {
    return this.incorporationService.roleTinContactForm.valid;
  }

  isRoleProofValid() {
    return this.incorporationService.roleProofForm.valid;
  }

  getProprietor() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this.incorporationService.getProprietor(id).subscribe({
        next: value => {
          this.isLoading = false;
          this.status = value.status;
          this.incorporationService.roleTinContactForm.patchValue(value.data);
          this.incorporationService.roleDetailsForm.patchValue(value.data);
          this.incorporationService.roleProofForm.patchValue(value.data);
          const ghanaCardData = value.data.ghanaCard.split(',');
          this.incorporationService.roleProofForm.controls.ghanaCard.push(
            this.fb.control(ghanaCardData[0], Validators.required),
          );
          this.incorporationService.roleProofForm.controls.ghanaCard.push(
            this.fb.control(ghanaCardData[1], Validators.required),
          );
        },
        error: err => {
          this.isLoading = false;
          this.toast.error(err.error?.message || defaultServerError);
        },
      });
    }
  }

  getDirector() {
    const id = this.activatedRoute.snapshot.queryParamMap.get('id');
    if (id) {
      this.isLoading = true;
      this.incorporationService.getDirector(id).subscribe({
        next: value => {
          this.isLoading = false;
          this.status = value.status;
          this.incorporationService.roleTinContactForm.patchValue(value.data);
          this.incorporationService.roleDetailsForm.patchValue(value.data);
          this.incorporationService.roleProofForm.patchValue(value.data);
          const ghanaCardData = value.data.ghanaCard.split(',');
          this.incorporationService.roleProofForm.controls.ghanaCard.push(
            this.fb.control(ghanaCardData[0], Validators.required),
          );
          this.incorporationService.roleProofForm.controls.ghanaCard.push(
            this.fb.control(ghanaCardData[1], Validators.required),
          );
        },
        error: err => {
          this.isLoading = false;
          this.toast.error(err.error?.message || defaultServerError);
        },
      });
    }
  }
}
