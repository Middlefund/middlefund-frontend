import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {InvestorService} from "../investor.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-investor-verification',
  templateUrl: './investor-verification.component.html',
  styleUrls: ['./investor-verification.component.css']
})
export class InvestorVerificationComponent implements OnInit{
  verificationFormData = new FormData();
  isLoadingPage: boolean = false;
  isLoading: boolean = false
  idSrc: string = ''
  proofSrc: string = ''
  status: string = ''
  visible = false
  investor: any

  constructor(private fb: FormBuilder,
              private investorService: InvestorService,
              private toast: ToastrService,
              private router: Router) {}

  ngOnInit() {
    this.getInvestor()
  }

  getInvestor() {
    this.isLoadingPage = true;
    this.investorService.getInvestor().subscribe({
      next: value => {
        this.status = value.data.status
        this.isLoadingPage = false;
      },
      error: err => {
        this.toast.error(err.error.error)
        this.isLoadingPage = false;
      }
    })
  }

  onIdChange(event: any) {
    const file = event.target.files[0];
    this.verificationForm.patchValue({ id: file})
    this.verificationFormData.set('id', file)
    // Check if the file is an image
    if (file && file.type.startsWith('application/pdf')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.idSrc = e.target.result
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  }

  onProofChange(event: any) {
    const file = event.target.files[0];
    this.verificationForm.patchValue({ proof: file})
    this.verificationFormData.set('proof', file)
    // Check if the file is an image
    if (file && file.type.startsWith('application/pdf')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.proofSrc = e.target.result
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  }

  verificationForm = this.fb.group({
    idType: ['', Validators.required],
    id: ['', Validators.required],
    proofType: ['', Validators.required],
    proof: ['', Validators.required]
  });

  toggleModal() {
    this.visible = !this.visible
  }

  onSubmit() {
    this.isLoading = true;
    this.verificationFormData.set('idType', this.verificationForm.controls.idType.value!)
    this.verificationFormData.set('proofType', this.verificationForm.controls.proofType.value!)
    this.investorService.verification(this.verificationFormData).subscribe({
      next: value => {
        this.toast.success(value.message)
        this.status = 'pending'
        this.isLoading = false;
        this.visible = false;
      },
      error: err => {
        this.toast.error(err.error.error)
        this.isLoading = false;
      }
    })
  }
}
