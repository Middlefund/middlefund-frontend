import {Component, OnInit} from '@angular/core';
import {AdminDashboardService} from "../admin-dashboard.service";
import {UserInvestor} from "../../models/interfaces";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup} from "@angular/forms";
import {ProfileInitials} from "../../utility/profileInitials";
import {faFacebookF, faInstagram, faLinkedinIn, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-investors',
  templateUrl: './manage-investors.component.html',
  styleUrls: ['./manage-investors.component.css']
})
export class ManageInvestorsComponent implements OnInit{
  statusOptions: { name: string, value: any }[] = [
    { name: 'Pending', value: 'pending' },
    { name: 'Verified', value: 'verified' },
    { name: 'Unverified', value: 'unverified' },
  ]

  tableHead = ['Name', 'Email', 'Interests', 'Status'];
  investors: any = []
  page: number = 1;
  isLoading = false;
  totalData: number = 0;
  visible: boolean = false;
  isLoadingInvestor: boolean = false;
  investor!: UserInvestor
  investorImage = ''

  constructor(private adminService: AdminDashboardService,
              private toast: ToastrService,
              private profileInitials: ProfileInitials,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllInvestors()

    this.filterSearch.valueChanges.subscribe(() => {
      this.getAllInvestors()
    })
  }

  filterSearch = new FormGroup({
    search: new FormControl(''),
    filter: new FormControl(null)
  })

  onPageChange(event: number) {
    this.page = event
    this.getAllInvestors()
  }
  getAllInvestors() {
    this.isLoading = true
    this.adminService.getAllInvestors(this.page, 10,
      this.filterSearch.controls.filter.value || '', this.filterSearch.controls.search.value!).subscribe({
      next: value => {
        this.investors = []
        this.investors = value.data.data.map((item: UserInvestor) => ({
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
}
