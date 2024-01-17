import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CompanyIncorporationService } from '../company-incorporation.service';
import { FileSelectEvent } from 'primeng/fileupload';
import { UploadService } from '../../utility/upload.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { defaultServerError, signatureMethods } from '../../utility/constants';
import {
  NgSignaturePadOptions,
  SignaturePadComponent,
} from '@almothafar/angular-signature-pad';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-proprietor-signature-declaration',
  templateUrl: './proprietor-signature-declaration.component.html',
  styleUrls: ['./proprietor-signature-declaration.component.css'],
})
export class ProprietorSignatureDeclarationComponent
  implements AfterViewInit, OnInit
{
  roleProofForm = inject(CompanyIncorporationService).roleProofForm;
  uploadedFiles: File[] = [];
  uploadedSignature: File[] = [];
  uploading: boolean = false;
  @ViewChild('signature')
  public signaturePad!: SignaturePadComponent;
  isLoading: boolean = false;

  protected signaturePadOptions: NgSignaturePadOptions = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 200,
    backgroundColor: '#606060',
  };

  constructor(
    private toast: ToastrService,
    private uploadService: UploadService,
    private fb: FormBuilder,
    private companyIncorporationService: CompanyIncorporationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.companyIncorporationService.roleTinContactForm.invalid) {
      this.companyIncorporationService.updateRoleStage(2);
    }

    this.signatureMethodsControl.valueChanges.subscribe(value => {
      this.roleProofForm.controls.signature.setValue('');
      if (value === 'send invite') {
        this.roleProofForm.controls.signature.addValidators(Validators.email);
        this.roleProofForm.controls.signature.updateValueAndValidity();
      }
    });
  }

  async onUploadGhanaCard(event: FileSelectEvent) {
    if (event.currentFiles.length === 2) {
      this.uploading = true;
      try {
        const firstImage = await this.uploadService.uploadImage(
          event.currentFiles[0],
        );

        const secondImage = await this.uploadService.uploadImage(
          event.currentFiles[1],
        );
        this.roleProofForm.controls.ghanaCard.clear();
        this.roleProofForm.controls.ghanaCard.push(
          this.fb.control(firstImage, Validators.required),
        );
        this.roleProofForm.controls.ghanaCard.push(
          this.fb.control(secondImage, Validators.required),
        );
        this.uploading = false;
      } catch (error) {
        this.uploading = false;
        this.toast.error('Unable to upload, try again later');
        throw new Error(error as string);
      }
    }
  }

  async onUploadSignature(event: FileSelectEvent) {
    this.uploading = true;
    try {
      const image = await this.uploadService.uploadImage(event.currentFiles[0]);
      this.roleProofForm.controls.signature.setValue(image);
      this.uploading = false;
    } catch (error) {
      this.uploading = false;
      this.toast.error('Unable to upload, try again later');
      throw new Error(error as string);
    }
  }

  signatureMethodsControl = this.fb.control(null);

  ngAfterViewInit() {
    this.signaturePad?.set('minWidth', 5);
    this.signaturePad?.clear();
  }

  async submitSignature() {
    this.uploading = true;
    try {
      const response = await fetch(this.signaturePad.toDataURL());
      const blob = await response.blob();
      const image = await this.uploadService.uploadImage(
        new File([blob], 'signature.png', { type: blob.type }),
      );
      this.roleProofForm.controls.signature.setValue(image);
      this.uploading = false;
    } catch (error) {
      this.uploading = false;
      this.toast.error('Unable to upload, try again later');
      throw new Error(error as string);
    }
  }

  onSubmit = () => {
    this.isLoading = true;
    const directorId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.companyIncorporationService
      .submitProprietorDirector(
        this.activatedRoute.snapshot.paramMap.get('id') as string,
        directorId ? directorId : undefined,
      )
      .subscribe({
        next: value => {
          this.isLoading = false;
          this.toast.success(value.message);
          if (
            this.companyIncorporationService.roleTinContactForm.controls.hasTin
              .value === 'no'
          ) {
            this.router.navigate([
              `/company-incorporation/tin-registration/${value.data.id}`,
            ]);
          } else {
            if (value.type === 'sole proprietorship') {
              this.router.navigate([`/company-incorporation/home`]);
            } else {
              this.router.navigate([
                `/company-incorporation/directors/${value.data['company_incorporation_id']}`,
              ]);
            }
          }
        },
        error: err => {
          this.isLoading = false;
          this.toast.error(err.error?.message || defaultServerError);
        },
      });
  };

  onPrevious() {
    this.companyIncorporationService.updateRoleStage(2);
  }
  protected readonly signatureMethods = signatureMethods;
}
