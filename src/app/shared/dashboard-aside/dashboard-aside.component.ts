import {Component, Input} from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-aside',
  templateUrl: './dashboard-aside.component.html',
  styleUrls: ['./dashboard-aside.component.css']
})
export class DashboardAsideComponent {
  @Input() navigationData: Array<{ route: string, icon: string, title: string }> = []
  loggingOut: boolean = false;

  constructor(private accountsService: AccountsService,
              private toast: ToastrService,
              private router: Router) {
  }

  logout() {
    this.loggingOut = true;
    this.accountsService.logout().subscribe({
      next: () => {

        localStorage.clear()
        this.accountsService.updateUser('')
        this.toast.success("You have successfully logged out")
        this.router.navigateByUrl('/login').then(r => r)
        this.loggingOut = false;
      },
      error: () => {
        this.toast.error("An error has occurred while logging out, Try again!")
        this.loggingOut = false;
      }
    });
  }
}
