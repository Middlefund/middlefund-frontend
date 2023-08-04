import { Component } from '@angular/core';
import {UserStartup} from "../../models/interfaces";
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

  tableHead = ['Name', 'Email', 'Industry', 'Status'];
  startups: UserStartup[] = []
  page: number = 1;
  isLoading = false;
  totalData: number = 0;
  visible: boolean = false;
  isLoadingStartup: boolean = false;
  startup!: UserStartup
  startupImage = ''
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
        this.startups = []
        this.startups = value.data.data.map((item: UserStartup) => ({
          Name: item.name,
          Email: item.email,
          Industry: item.industry,
          Status: item.verified,
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
    this.isLoadingStartup = true;
    this.adminService.getStartupById(event).subscribe({
      next: value => {
        this.startup = value.data
        this.isLoadingStartup = false;
        this.startupImage = this.startup?.avatar ?
          this.startup?.avatar : this.profileInitials.createImageFromInitials(this.profileInitials.getInitials(this.startup?.name))
      },
      error: err => {
        this.toast.error(err.error.error)
        this.isLoadingStartup = false;
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
    this.startups.map((startup) => {
      if(startup.id === this.startup.id) {
        startup.verified = status
      }
    })
  }

  onVerify() {
    this.isVerifying = true;
    this.adminService.verifyStartup(this.startup.id).subscribe({
      next: value => {
        this.toast.success(value.message)
        this.isVerifying = false;
        this.toggleModal()
        this.startup.verified = 'verified'
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
    this.adminService.declineStartup(this.startup.id).subscribe({
      next: value => {
        this.toast.success(value.message)
        this.isDeclining = false;
        this.toggleModal()
        this.startup.verified = 'unverified'
        this.resetStatus('unverified')
      },
      error: err => {
        this.toast.error(err.error.error)
        this.isDeclining = false;
      }
    })
  }
}
