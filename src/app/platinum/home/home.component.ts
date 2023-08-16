import { Component } from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";
import {Location} from "@angular/common";
import {PlatinumService} from "../platinum.service";

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
              private platinumService: PlatinumService) {
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
        console.log(value)
        value.data.map((workspace: any) => {

        })
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
      }
    })
  }

}
