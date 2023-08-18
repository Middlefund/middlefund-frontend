import { Component } from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";
import {Location} from "@angular/common";
import {PlatinumService} from "../platinum.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  name: string = ''
  workspaces: Array<{name: string, value: string}> = []
  isLoading: boolean = false
  constructor(private accountsService: AccountsService,
              private location: Location,
              private platinumService: PlatinumService,
              private toast: ToastrService
              ) {
  }

  ngOnInit() {
    this.accountsService.user.subscribe(value => {
      this.name = value.user.name
    })



    this.getWorkspaces()
  }

  goBack() {
    this.location.back()
  }

  getWorkspaces() {
    this.isLoading = true;
    this.platinumService.getUserWorkspaces().subscribe({
      next: value => {
        value.data.map((workspace: any) => {
          this.workspaces.push({name: workspace.name, value: workspace.workspace_id})
        })
        this.isLoading = false;
      },
      error: err => {
        this.toast.error(err.error.message)
        this.isLoading = false;
      }
    })
  }

}
