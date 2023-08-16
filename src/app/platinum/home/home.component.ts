import { Component } from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  name: string = ''
  constructor(private accountsService: AccountsService,
              private location: Location) {
  }

  ngOnInit() {
    this.accountsService.user.subscribe(value => {
      this.name = value.user.name
    })
  }

  goBack() {
    this.location.back()
  }

}
