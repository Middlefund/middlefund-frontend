import {Component, OnInit} from '@angular/core';
import {AdminDashboardService} from "../admin-dashboard.service";
import {UserInvestor} from "../../models/interfaces";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-manage-investors',
  templateUrl: './manage-investors.component.html',
  styleUrls: ['./manage-investors.component.css']
})
export class ManageInvestorsComponent implements OnInit{
  statusOptions: { name: string, value: any }[] = [
    { name: 'Pending', value: 'Pending' },
    { name: 'Verified', value: 'Verified' },
    { name: 'Unverified', value: 'Unverified' },
  ]

  tableHead = ['Name', 'Email', 'Interests', 'Status'];
  investors: any = []
  page: number = 1;
  isLoading = false;
  totalData: number = 0;

  constructor(private adminService: AdminDashboardService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.getAllInvestors()
  }

  getAllInvestors() {
    this.isLoading = true
    this.adminService.getAllInvestors(this.page, 10, '', '').subscribe({
      next: value => {
        this.investors = value.data.data.map((item: UserInvestor) => ({
          Name: item.name,
          Email: item.email,
          Interests: item.interests,
          Status: item.status
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

}
