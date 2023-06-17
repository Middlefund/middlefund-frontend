import {Component, OnInit} from '@angular/core';
import {AccountsService} from "../accounts/accounts.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  accountType: string = ''
  constructor(private accountsService: AccountsService) {
  }

  ngOnInit(): void {
    this.accountType = this.accountsService.userData.user_type
  }

}
