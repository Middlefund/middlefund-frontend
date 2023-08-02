import { Component } from '@angular/core';
import {UserInvestor} from "../../models/interfaces";
import {AdminDashboardService} from "../admin-dashboard.service";
import {ToastrService} from "ngx-toastr";
import {ProfileInitials} from "../../utility/profileInitials";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-manage-startups',
  templateUrl: './manage-startups.component.html',
  styleUrls: ['./manage-startups.component.css']
})
export class ManageStartupsComponent {
  statusOptions: { name: string, value: any }[] = [
    { name: 'Pending', value: 'pending' },
    { name: 'Verified', value: 'verified' },
    { name: 'Unverified', value: 'unverified' },
  ]

  tableHead = ['Name', 'Email', 'Interests', 'Status'];
  startups: any = []
  page: number = 1;
  isLoading = false;
  totalData: number = 0;
  visible: boolean = false;
  isLoadingInvestor: boolean = false;
  investor!: UserInvestor
  investorImage = ''
  verifyConfirmationModal = false;
  isVerifying: boolean = false;
  isDeclining: boolean = false;
  declineConfirmationModal = false;

  constructor(private adminService: AdminDashboardService,
              private toast: ToastrService,
              private profileInitials: ProfileInitials,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllStartups()

    this.filterSearch.valueChanges.subscribe(() => {
      this.getAllStartups()
    })
  }

  filterSearch = new FormGroup({
    search: new FormControl(''),
    filter: new FormControl(null)
  })

  onPageChange(event: number) {
    this.page = event
    this.getAllStartups()
  }
  getAllStartups() {
    this.isLoading = true
    this.adminService.getAllStartups(this.page, 10,
      this.filterSearch.controls.filter.value || '', this.filterSearch.controls.search.value!).subscribe({
      next: value => {
        console.log(value.data.data)
        this.startups = []
        this.startups = value.data.data.map((item: UserInvestor) => ({
          Name: item.name,
          Email: item.email,
          Interests: item.interests,
          Status: item.status,
          id: item.id
        }))
        this.totalData = value.data.totalItems
        this.isLoading = false;
      },
      error: err => {
        this.toast.error(err.error.error)
        this.isLoading = false;
      }
    })
  }

  onPreview(event: string) {
    this.visible = true;
    this.isLoadingInvestor = true;
    this.adminService.getInvestorById(event).subscribe({
      next: value => {
        this.investor = value.data
        this.isLoadingInvestor = false;
        this.investorImage = this.investor?.avatar ?
          this.investor?.avatar : this.profileInitials.createImageFromInitials(this.profileInitials.getInitials(this.investor?.name))
      },
      error: err => {
        this.toast.error(err.error.error)
        this.isLoadingInvestor = false;
      }
    })
  }

  openInNewTab(url: string) {
    window.open(url, '_blank');
  }

  toggleModal() {
    this.verifyConfirmationModal = !this.verifyConfirmationModal
  }

  resetStatus(status: string) {
    this.startups.map((investor: UserInvestor) => {
      if(investor.id === this.investor.id) {
        investor.status = status
      }
    })
  }

  onVerify() {
    this.isVerifying = true;
    this.adminService.verifyInvestor(this.investor.id).subscribe({
      next: value => {
        this.toast.success(value.message)
        this.isVerifying = false;
        this.toggleModal()
        this.investor.status = 'verified'
        this.resetStatus('verified')
      },
      error: err => {
        this.toast.error(err.error.error)
        this.isVerifying = false;
      }
    })
  }

  toggleDeclineModal() {
    this.declineConfirmationModal = !this.declineConfirmationModal
  }

  onDecline() {
    this.isDeclining = true;
    this.adminService.declineInvestor(this.investor.id).subscribe({
      next: value => {
        this.toast.success(value.message)
        this.isDeclining = false;
        this.toggleModal()
        this.investor.status = 'unverified'
        this.resetStatus('unverified')
      },
      error: err => {
        this.toast.error(err.error.error)
        this.isDeclining = false;
      }
    })
  }
}
